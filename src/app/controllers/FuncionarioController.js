import FuncionariosRepository from "../repositories/FuncionariosRepository";

class FuncionarioController {
  //listar todos os registros
  async index(req, res) {
    const { orderBy } = req.query;
    const funcionario = await FuncionariosRepository.findAll(orderBy);
    res.json(funcionario);
  }

  //lista um registro
  async show(req, res) {
    const { id } = req.params;
    const funcionario = await FuncionariosRepository.findById(id);

    if (!funcionario) {
      return res.status(404).json({ error: "funcionario não foi encontrado" });
    }

    res.json(funcionario);
  }

  //cria um registro
  async create(req, res) {
    const { func_id, func_name, func_email, func_password, func_level } =
      req.body;

    if (!func_name || !func_email) {
      return res.status(400).json({ error: "Falta de dados importantes" });
    }

    const funcionarioExists = await FuncionariosRepository.findByName(
      func_name
    );

    if (funcionarioExists) {
      return res
        .status(400)
        .json({ error: "Esse funcionario ja está cadastrado" });
    }

    const funcionario = await FuncionariosRepository.create({
      func_name,
      func_email,
      func_level,
      func_password,
    });

    res.json(funcionario);
  }

  //atualiza um registro
  async update(req, res) {
    const { id } = req.params;
    const { func_name, func_email, func_password, func_level } = req.body;

    if (!func_name || !func_email || !func_password || !func_level) {
      return res.status(400).json({ error: "Falta de dados importantes" });
    }

    const funcionarioExists = await FuncionariosRepository.findById(id);

    if (!funcionarioExists) {
      return res.status(404).json({ error: "funcionario não encontrado" });
    }

    const funcionario = await FuncionariosRepository.update(id, {
      func_name,
      func_email,
      func_password,
      func_level,
    });

    res.json(funcionario);
  }

  //deleta um registro
  async destroy(req, res) {
    const { id } = req.params;

    const funcionario = await FuncionariosRepository.findById(id);

    if (!funcionario) {
      return res.status(404).json({ error: "funcionario não foi encontrado" });
    }

    await FuncionariosRepository.delete(id);

    res.sendStatus(204);
  }
}

export default new FuncionarioController();
