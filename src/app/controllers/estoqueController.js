import EstoqueRepository from "../repositories/EstoqueRepository";

class EstoqueController {
  //listar todos os registros
  async index(req, res) {
    const { orderBy } = req.query;
    const estoque = await EstoqueRepository.findAll(orderBy);
    res.json(estoque);
  }

  //lista um registro
  async show(req, res) {
    const { id } = req.params;
    const product = await EstoqueRepository.findById(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  }

  //cria um registro
  async create(req, res) {
    const { prod_id, prod_name, prod_price, prod_desc, prod_type } = req.body;

    if (!prod_name || !prod_price) {
      return res.status(400).json({ error: "Falta de dados importantes" });
    }

    const productExists = await EstoqueRepository.findByName(prod_name);

    if (productExists) {
      return res.status(400).json({ error: "Esse produto ja está cadastrado" });
    }

    const product = await EstoqueRepository.create({
      prod_id,
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

    const productExists = await EstoqueRepository.findById(id);

    if (!productExists) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    const product = await EstoqueRepository.update(id, {
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

    const product = await EstoqueRepository.findById(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    await EstoqueRepository.delete(id);

    res.sendStatus(204);
  }
}

export default new EstoqueController();
