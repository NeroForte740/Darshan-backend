import { Router } from "express";

import EstoqueController from "./app/controllers/estoqueController";

const router = Router();

// Rotas GET
router.get("/produtos", EstoqueController.index);
router.get("/produtos/:id", EstoqueController.show);

// Rotas POST
router.post("/produtos", EstoqueController.create);

// Rotas PUT
router.put("/produtos/:id", EstoqueController.update);

// Rotas DELETE
router.delete("/produtos/:id", EstoqueController.destroy);

export default router;
