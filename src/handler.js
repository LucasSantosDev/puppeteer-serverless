const chromium = require("chrome-aws-lambda");
const puppeteer = require("puppeteer-core");

module.exports.handler = async (event, context) => {
  let executablePath;

  if (process.env.IS_OFFLINE) {
    // Use path of puppeteer's bundled Chromium when running offline
    executablePath = require("puppeteer").executablePath();
  } else {
    executablePath = await chromium.executablePath;
  }

  let browser = null;

  try {
    browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: executablePath,
      headless: true, // chromium.headless,
    });

    const page = await browser.newPage();
    await page.goto("https://google.com", { waitUntil: "domcontentloaded" });

    await page.waitForSelector("textarea[name='q']");
    await page.click("textarea[name='q']");
    await page.keyboard.type("leao");

    await page.waitForTimeout(1000);

    await page.waitForSelector("input[name='btnK']");
    await page.click("input[name='btnK']");

    // const screenshot = await page.screenshot({ encoding: "base64" });
    // console.log(screenshot);

    return response(200, { message: "Success to execute" });
  } catch (error) {
    return response(500, { error: `Error to execute: ${error.message}` });
  } finally {
    if (browser !== null) {
      await browser.close();
    }
  }
};

const response = (statusCode, body) => {
  return {
    statusCode,
    body: JSON.stringify(body),
  };
};
