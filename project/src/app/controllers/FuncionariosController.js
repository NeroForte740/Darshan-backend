const FuncionariosModel = require('../model/FuncionariosModel');

class FuncionariosController {

  async index(req, res) {
    try {
      const data = await FuncionariosModel.findAll();
      return res.send(data);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }

  async show(req, res) {
    try {
      const id = parseInt(req.params.id);
      const data = await FuncionariosModel.findById(id);
      return res.send(data);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }

  async create(req, res) {
    try {
      const { email } = req.body;
      const funcionarioExistente = await FuncionariosModel.findByEmail(email);
      if (funcionarioExistente && funcionarioExistente.length > 0) {
        return res.status(400).json({ error: "Email já cadastrado" });
      }
      const data = await FuncionariosModel.create(req.body);
      return res.send(data);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }

  async update(req, res) {
    try {
      const id = parseInt(req.params.id);
      const data = await FuncionariosModel.update(id, req.body);
      return res.send(data);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }

  async destroy(req, res) {
    try {
      const id = parseInt(req.params.id);
      await FuncionariosModel.delete(id);
      return res.send("Status 201");
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }
}
module.exports = new FuncionariosController();
