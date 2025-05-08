const { Router } = require("express");
const routes = new Router();

const produtos = require("../app/controllers/ProdutosController");
const funcionarios = require("../app/controllers/FuncionariosController");
const pedidos = require("../app/controllers/PedidosController");
const pagamentos = require("../app/controllers/PagamentosController");
const usuarios = require("../app/controllers/Modelo");

//Rotas Produtos
routes.get("/produtos", produtos.index);
routes.get("/produtos/show/:id", produtos.show);
routes.post("/produtos/create", produtos.create);
routes.put("/produtos/update/:id", produtos.update);
routes.delete("/produtos/destroy/:id", produtos.destroy);

//Rotas Funcionarios
routes.get("/funcionarios", funcionarios.index);
routes.get("/funcionarios/show/:id", funcionarios.show);
routes.post("/funcionarios/create", funcionarios.create);
routes.patch("/funcionarios/update/:id", funcionarios.update);
routes.delete("/funcionarios/destroy/:id", funcionarios.destroy);

//Rotas Pedidos
routes.get("/pedidos", pedidos.index);
routes.get("/pedidos/show/:id", pedidos.show);
routes.post("/pedidos/create", pedidos.create);
routes.patch("/pedidos/update/:id", pedidos.update);
routes.delete("/pedidos/destroy/:id", pedidos.destroy);

//Rotas Pagamentos
routes.get("/pagamentos", pagamentos.index);
routes.get("/pagamentos/show/:id", pagamentos.show);
routes.post("/pagamentos/create", pagamentos.create);
routes.patch("/pagamentos/update/:id", pagamentos.update);
routes.delete("/pagamentos/destroy/:id", pagamentos.destroy);

// //Rotas Usuários
// routes.get("/usuarios", usuarios.index);
// routes.get("/usuarios/show/:id", usuarios.show);
// routes.post("/usuarios/create", usuarios.create);
// routes.patch("/usuarios/update/:id", usuarios.update);
// routes.delete("/usuarios/destroy/:id", usuarios.destroy);

module.exports = routes;
