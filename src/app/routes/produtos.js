import { Router } from "express";

import ProdutoController from "../controllers/ProdutoController";

const router = Router();

// Rotas GET
router.get("/produtos", ProdutoController.index);
router.get("/produtos/:id", ProdutoController.show);

// Rotas POST
router.post("/produtos", ProdutoController.create);

// Rotas PUT
router.put("/produtos/:id", ProdutoController.update);

// Rotas DELETE
router.delete("/produtos/:id", ProdutoController.destroy);

export default router;
