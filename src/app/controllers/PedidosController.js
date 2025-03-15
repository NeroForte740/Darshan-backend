import PedidosRepository from "../repositories/PedidosRepository";

class PedidosRepository {
  //listar todos os registros
  async index(req, res) {
    const { orderBy } = req.query;
    const pedido = await PedidosRepository.findAll(orderBy);
    res.json(pedido);
  }

  //lista um registro
  async show(req, res) {
    const { id } = req.params;
    const pedido = await PedidosRepository.findById(id);

    if (!pedido) {
      return res.status(404).json({ error: "pedido não foi encontrado" });
    }

    res.json(pedido);
  }

  //cria um registro
  async create(req, res) {
    const { ped_id, ped_description, ped_totalprice, ped_status_preparo, ped_status_pag, ped_cliente, ped_priori} = req.body;

    if (!ped_description || !ped_totalprice) {
      return res.status(400).json({ error: "Falta de dados importantes" });
    }

    const pedidoExists = await PedidosRepository.findByDescription(ped_id);

    if (pedidoExists) {
      return res.status(400).json({ error: "Esse pedido ja está cadastrado" });
    }

    const pedido = await PedidosRepository.create({
      ped_id,
      ped_description,
      ped_totalprice,
      ped_status_preparo,
      ped_status_pag,
      ped_cliente,
      ped_priori
    });

    res.json(pedido);
  }

  //atualiza um registro
  async update(req, res) {
    const { id } = req.params;
    const { ped_description, ped_totalprice, ped_status_preparo, ped_status_pag, ped_cliente, ped_priori } = req.body;

    if (!ped_description || !ped_totalprice || !ped_status_preparo || !ped_level) {
      return res.status(400).json({ error: "Falta de dados importantes" });
    }

    const pedidoExists = await PedidosRepository.findById(id);

    if (!pedidoExists) {
      return res.status(404).json({ error: "pedido não encontrado" });
    }

    const pedido = await PedidosRepository.update(id, {
      ped_id,
      ped_description,
      ped_totalprice,
      ped_status_preparo,
      ped_status_pag,
      ped_cliente,
      ped_priori
    });

    res.json(pedido);
  }

  //deleta um registro
  async destroy(req, res) {
    const { id } = req.params;

    const pedido = await PedidosRepository.findById(id);

    if (!pedido) {
      return res.status(404).json({ error: "pedido não foi encontrado" });
    }

    await PedidosRepository.delete(id);

    res.sendStatus(204);
  }
}

export default new PedidosRepository();
