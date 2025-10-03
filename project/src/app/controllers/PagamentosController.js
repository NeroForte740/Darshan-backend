const PagamentosModel = require("../model/PagamentosModel")

class PagamentosController {

  async index(req, res) {
    try {
      const data = await PagamentosModel.findAll();
      return res.send(data);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }

  async show(req, res) {
    try {
      const id = parseInt(req.params.id);
      const data = await PagamentosModel.findById(id);
      return res.send(data);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }

  async create(req, res) {
    try {
      const data = await PagamentosModel.create(req.body);
      return res.send(data);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }

  async update(req, res) {
    try {
      const id = parseInt(req.params.id);
      const data = await PagamentosModel.update(id, req.body);
      return res.send(data);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }

  async destroy(req, res) {
    try {
      const id = parseInt(req.params.id);
      await PagamentosModel.delete(id);
      return res.send("Status 201");
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }
}

module.exports = new PagamentosController();
