import PedidosRepository from "../repositories/PedidosRepository";

class PedidoController {
  //listar todos os registros
  async index(req, res) {
    const { orderBy } = req.query;
    const estoque = await PedidosRepository.findAll(orderBy);
    res.json(estoque);
  }

  //lista um registro
  async show(req, res) {
    const { id } = req.params;
    const product = await PedidosRepository.findById(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  }

  //cria um registro
  async create(req, res) {
    const { prod_name, prod_price, prod_desc, prod_type } = req.body;

    if (!prod_name || !prod_price || prod_type) {
      return res.status(400).json({ error: "Falta de dados importantes" });
    }

    const productExists = await PedidosRepository.findByName(prod_name);

    if (productExists) {
      return res.status(400).json({ error: "Esse produto ja está cadastrado" });
    }

    const product = await PedidosRepository.create({
      prod_name,
      prod_price,
      prod_type,
      prod_desc,
    });

    res.json(product);
  }

  //atualiza um registro
  async update(req, res) {
    const { id } = req.params;
    const { prod_name, prod_price, prod_desc, prod_type } = req.body;

    if (!prod_name || !prod_price || !prod_desc || !prod_type) {
      return res.status(400).json({ error: "Falta de dados importantes" });
    }

    const productExists = await PedidosRepository.findById(id);

    if (!productExists) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    const product = await PedidosRepository.update(id, {
      prod_name,
      prod_price,
      prod_desc,
      prod_type,
    });

    res.json(product);
  }

  //deleta um registro
  async destroy(req, res) {
    const { id } = req.params;

    const product = await PedidosRepository.findById(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    await PedidosRepository.delete(id);

    res.sendStatus(204);
  }
}

export default new PedidoController();
