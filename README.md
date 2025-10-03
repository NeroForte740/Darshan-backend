# Projeto Darshan

Darshan — aplicação Node.js com Express e Supabase.

## 🚀 Tecnologias
- Node.js
- Express
- Supabase
- JWT (jsonwebtoken)
- Bcrypt
- Dotenv
- Nodemon (dev)

## 📦 Instalação

Clone o repositório:

```bash
git clone https://github.com/NeroForte740/Darshan-backend.git
cd Darshan-backend

Instale as dependências:

npm install
# ou
yarn install

⚙️ Configuração

Crie um arquivo .env na raiz do projeto com as variáveis necessárias, por exemplo:

PORT=3001
SUPABASE_URL=...
SUPABASE_KEY=...

▶️ Execução

Ambiente de desenvolvimento:

npm run dev

O servidor será iniciado em:

http://localhost:3001

🔑 Autenticação

A rota /session gera um token JWT para autenticação.

🧪 Testes

Se estiver usando Jest + Supertest:

npm test

📁 Estrutura de Pastas (parcial)

project/
 └── src/
     ├── server.js        # ponto de entrada do servidor
     ├── app.js           # configuração do Express, middlewares e rotas
     ├── routes/
     │    └── routes.js   # definição das rotas da aplicação
     └── app/
          ├── controllers/   # lógica de cada recurso (Produtos, Pedidos, etc.)
          └── middlewares/   # middlewares (ex.: auth)

📜 Licença

MIT

