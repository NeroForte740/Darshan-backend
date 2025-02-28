# Darshan
College's conclusion project for UNIFOR's - SAD - 'Projeto Aplicado 2'

Node.js com express
MVC HTTP REST 
react.js

Yarn
  npm install --global yarn
  yarn --version
  yarn set version stable

Nodemon
  yarn add nodemon -D
-- no arquivo package.json criar um parametro scripts
  {
    "scripts":{
      "dev":"nodemon ./src/server.js"
    }
  }

Sucrase
  yarn add sucrase -D
-- na pasta raiz ( no caso a src ) criar um arquivo "nodemon.js" com os seguintes comandos
  {
   "ExecMap": {
     "js":"sucrase-node"
     }
  }
-- para executar entrar com o codigo-terminal
  npx sucrase-node ./src/server.js
  
