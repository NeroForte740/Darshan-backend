// const dotenv = require("dotenv").config();
// const cliente = require("../../config/db");

const ProdutosModel = require('../model/ProdutosModel')

class ProdutosController {
  // Recupera todos os registros
  // async index(req, res) {
  //   let { data } = await cliente.supabase.from("produtos").select("*");
  //   return res.send(data);
  // }
  // Recupera um registro
  // async show(req, res) {
  //   const id = parseInt(req.params.id);
  //   let { data } = await cliente.supabase.from("produtos").select().eq("prod_id", id);
  //   return res.send(data);
  // }
  // Cria um registro
  // async create(req, res) {
  //   const { name, price, type, desc } = req.body;  
  //   const { data, error } = await cliente.supabase
  //     .from("produtos")
  //     .insert({
  //       prod_id, //auto-increment  
  //       prod_name: name,
  //       prod_price: price,
  //       prod_type: type,
  //       prod_desc: desc,
  //     })
  //     .select();
  //   return res.send(data);
  // }
  // Atualiza um registro
  // async update(req, res) {
  //   const id = parseInt(req.params.id);
  //   const { name, price, type, desc } = req.body;
  //   const { data, error } = await cliente.supabase
  //     .from("produtos")
  //     .update({
  //       prod_id,
  //       prod_name: name,
  //       prod_price: price,
  //       prod_type: type,
  //       prod_desc: desc,
  //       created_at: created_at,
  //     })
  //     .eq("prod_id", id)
  //     .select();
  //   return res.send(data);
  // }
  // Deleta um registro
  // async destroy(req, res) {
  //   const id = parseInt(req.params.id);
  //   const response = await cliente.supabase
  //     .from("produtos")
  //     .delete()
  //     .eq("prod_id", id);
  //   return res.send("Status 201");
  // }

      
      
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
