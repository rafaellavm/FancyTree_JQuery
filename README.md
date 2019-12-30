Exemplo do componente em JQuery Fancytree que gera uma árvore de objetos

1) Instalar o pacote json-server para rodar o json no servidor local:

link: https://medium.com/codingthesmartway-com-blog/create-a-rest-api-with-json-server-36da8680136d

"Create A REST API With JSON Server

Installing JSON Server
JSON Server is available as a NPM package. The installation can be done by using the Node.js package manager:

$ npm install -g json-server

By adding the -g option we make sure that the package is installed globally on your system."

2) Dentro da pasta /js rodar o comando pra levantar o servidor:

$ json-server --watch retorno.json

Esse json é chamado no ajax dentro do código do Fancytree

Pra rodar em uma porta específica:

$ json-server --watch db.json --port 3004