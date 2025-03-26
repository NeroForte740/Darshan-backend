import { Router } from "express";

import FuncionarioController from "../controllers/FuncionarioController";

const router = Router();

// Rotas GET
router.get("/funcionarios", FuncionarioController.index);
router.get("/funcionarios/:id", FuncionarioController.show);

// Rotas POST
router.post("/funcionarios", FuncionarioController.create);

// Rotas PUT
router.put("/funcionarios/:id", FuncionarioController.update);

// Rotas DELETE
router.delete("/funcionarios/:id", FuncionarioController.destroy);

export default router;
