const FinalizadosModel = require("../model/FinalizadosModel");

class FinalizadosController {
  async index(req, res) {
    try {
      const finalizados = await FinalizadosModel.findAll();
      res.json(finalizados);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async show(req, res) {
    try {
      const finalizados = await FinalizadosModel.findById(req.params.id);
      res.json(finalizados);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async create(req, res) {
    try {
      const id = req.params.id;
      if (!id) {
        return res.status(400).json({ message: "ID do pedido não fornecido" });
      }
      
      const pedidoFinalizado = await FinalizadosModel.create(id);
      res.status(201).json(pedidoFinalizado);
    } catch (error) {
      console.error("Erro ao finalizar pedido:", error);
      res.status(400).json({ 
        message: "Erro ao finalizar pedido", 
        error: error.message 
      });
    }
  }

  async update(req, res) {
    try {
      const id = req.params.id;
      const finalizados = req.body;
      const updated = await FinalizadosModel.update(id, finalizados);
      res.json(updated);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async destroy(req, res) {
    try {
      const id = req.params.id;
      await FinalizadosModel.delete(id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new FinalizadosController();
