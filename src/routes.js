import { Router } from "express";

import EstoqueController from "./app/controllers/estoqueController";
import pedidosController from "./app/controllers/pedidosController";

const router = Router();

// Rotas GET
router.get("/produtos", EstoqueController.index);
router.get("/produtos/:id", EstoqueController.show);

router.get("/pedidos", pedidosController.index);
router.get("/pedidos/:id", pedidosController.show);

router.get("/funcionarios", pedidosController.index);
router.get("/funcionarios/:id", pedidosController.show);


// Rotas POST
router.post("/produtos", EstoqueController.create);

router.post("/pedidos", EstoqueController.create);

router.post("/funcionarios", EstoqueController.create);


// Rotas PUT
router.put("/produtos/:id", EstoqueController.update);

router.put("/pedidos/:id", EstoqueController.update);

router.put("/funcionarios/:id", EstoqueController.update);


// Rotas DELETE
router.delete("/produtos/:id", EstoqueController.destroy);

router.delete("/pedidos/:id", EstoqueController.destroy);

router.delete("/funcionarios/:id", EstoqueController.destroy);


export default router;
