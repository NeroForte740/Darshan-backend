const PedidosModel = require("../model/PedidosModel");

class PedidosController {
  async index(req, res) {
    try {
      const pedidos = await PedidosModel.findAll();
      res.json(pedidos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async show(req, res) {
    try {
      const pedido = await PedidosModel.findById(req.params.id);
      res.json(pedido);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async create(req, res) {
    try {
      const pedido = req.body;
      const newPedido = await PedidosModel.create(pedido);
      res.status(201).json(newPedido);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const id = req.params.id;
      const pedido = req.body;
      const updated = await PedidosModel.update(id, pedido);
      res.json(updated);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async destroy(req, res) {
    try {
      const id = req.params.id;
      await PedidosModel.delete(id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new PedidosController();
