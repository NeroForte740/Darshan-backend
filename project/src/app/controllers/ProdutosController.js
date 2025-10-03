const ProdutosModel = require('../model/ProdutosModel')

class ProdutosController {

  async index(req, res) {
    try {
      const products = await ProdutosModel.findAll();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }  
  };  

  async show(req, res) {
    try {
      const id = req.params.id;
      const product = await ProdutosModel.findById(id);
      res.json(product);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }  
  };  


  async create(req, res) {
    try {
      const product = req.body;
      const newProduct = await ProdutosModel.create(product);
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }  
  }  
  async update(req, res) {
    try {
      const id = req.params.id;
      const updates = req.body;
      const updated = await ProdutosModel.update(id, updates);
      res.json(updated);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }



  async destroy(req, res) {
    try {
      const id = req.params.id;
      await ProdutosModel.delete(id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new ProdutosController();
