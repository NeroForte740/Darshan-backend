import { Router } from "express";

import PagamentoController from "../controllers/PagamentoController";

const router = Router();

// Rotas GET
router.get("/pagamentos", PagamentoController.index);
router.get("/pagamentos/:id", PagamentoController.show);

// Rotas POST
router.post("/pagamentos", PagamentoController.create);

// Rotas PUT
router.put("/pagamentos/:id", PagamentoController.update);

// Rotas DELETE
router.delete("/pagamentos/:id", PagamentoController.destroy);

export default router;
