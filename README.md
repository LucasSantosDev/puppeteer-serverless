# Puppeteer Lambda Project

> Este projeto utiliza o Serverless Framework para criar uma função AWS Lambda que tira capturas de tela de sites usando Puppeteer. O projeto é estruturado de modo que as dependências do Puppeteer são mantidas em uma camada separada para otimizar o tamanho do pacote de implantação.

## Estrutura do Projeto

```
/puppeteer-lambda
|-- /layers
| |-- /puppeteerLayer
| | |-- nodejs
| | | |-- package.json
|-- /src
| |-- handler.js
|-- serverless.yml
|-- README.md
```

## Pré-requisitos

- Node.js v14.x
- Serverless Framework

<br />

# Configuração

### Dependências

Navegue até `layers/puppeteerLayer/nodejs` e instale as dependências:

```bash
cd layers/puppeteerLayer/nodejs
npm install
```

## Ambiente Local

> Para testar localmente, você pode usar o plugin serverless-offline. Isso simula o ambiente AWS Lambda em sua máquina local.

Execute o seguinte comando para iniciar o servidor offline:

```bash
sls offline
```

O servidor será iniciado na porta 3090.

## Funções

> Screenshot: A função screenshot navega até o site do Google, insere uma query e clica no botão de pesquisa. O resultado é uma captura de tela da página. Esta função é acionada automaticamente a cada 30 minutos usando o AWS EventBridge.

## Camadas

> Puppeteer: Esta camada contém as dependências do Puppeteer e do Chrome AWS Lambda. Mantendo estas dependências em uma camada separada, garantimos que o tamanho da função principal permaneça gerenciável.

## Considerações Adicionais

> A variável de ambiente NODE_PATH foi configurada para incluir /opt para garantir que as dependências na camada sejam acessíveis pela função Lambda.

> Ao fazer o deploy da função, lembre-se de que a camada e a função são implantadas separadamente. Qualquer alteração nas dependências requer uma nova implantação da camada.

### Troubleshot

```console
cd node_modules/pupetter
```

```console
npm run install
```

or

```console
npm install
```