const PedidosModel = require('../model/PedidosModel');

class PedidosController {
  // Recupera todos os registros
  // async index(req, res) {
  //   let { data } = await cliente.supabase.from("pedidos").select("*");
  //   return res.send(data);
  // }
 
  // Recupera um registro
  // async show(req, res) {
  //   const id = parseInt(req.params.id);
  //   let { data } = await cliente.supabase.from("pedidos").select().eq("ped_id", id);
  //   return res.send(data);
  // }
  
  // Cria um registro
  // async create(req, res) {
  //   const { id, description, totalprice, status_prep, status_pag, client, priori } = req.body;
  //   const { data, error } = await cliente.supabase
  //     .from("pedidos")
  //     .insert({
  //       ped_id, //autoincrement
  //       ped_description: description,
  //       ped_totalprice: totalprice,
  //       ped_status_preparo: status_prep,
  //       ped_status_pag: status_pag,
  //       ped_cliente: client,
  //       ped_priori: priori,
  
  //     })
  //     .select();
  //   return res.send(data);
  // }
  // Atualiza um registro
  // async update(req, res) {
  //   const id = parseInt(req.params.id);
  //   const { description, totalprice, status_prep, status_pag, client, priori } = req.body;
  //   const { data, error } = await cliente.supabase
  //     .from("pedidos")
  //     .update({
  //       ped_description: description,
  //       ped_totalprice: totalprice,
  //       ped_status_preparo: status_prep,
  //       ped_status_pag: status_pag,
  //       ped_cliente: client,
  //       ped_priori: priori,
  //     })
  //     .eq("ped_id", id)
  //     .select();
  //   return res.send(data);
  // }
  
  // Deleta um registro
  // async destroy(req, res) {
  //   const id = parseInt(req.params.id);
  //   const response = await cliente.supabase
  //     .from("pedidos")
  //     .delete()
  //     .eq("ped_id", id);
  //   return res.send("Status 201");
  // }
  
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
      const { pedido, produtos } = req.body;
      // Ex: produtos = [{ produto_id: 'prod_id1', quantidade: 2 }, { produto_id: 'prod_id2', quantidade: 1 }]
      const newPedido = await PedidosModel.create(pedido, produtos);
      res.status(201).json(newPedido);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  
  async update(req, res) {
    try {
      const id = req.params.id;
      const { pedido, produtos } = req.body;
      const updated = await PedidosModel.update(id, pedido, produtos);
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
