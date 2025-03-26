import { Router } from "express";

import PedidosController from "../controllers/PedidoController";

const router = Router();

// Rotas GET
router.get("/pedidos", PedidosController.index);
router.get("/pedidos/:id", PedidosController.show);

// Rotas POST
router.post("/pedidos", PedidosController.create);

// Rotas PUT
router.put("/pedidos/:id", PedidosController.update);

// Rotas DELETE
router.delete("/pedidos/:id", PedidosController.destroy);

export default router;
