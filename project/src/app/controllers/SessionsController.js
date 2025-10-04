const FuncionariosModel = require("../model/FuncionariosModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const authCongif = require("../../config/auth");

class SessionsController {
  async create(req, res) {
    const { email, password } = req.body;

    const user = await FuncionariosModel.findByEmail(email);
    if (user.length === 0) {
      return res.status(400).json({ error: "Funcionario não encontrado" });
    }

    const userPassword = await FuncionariosModel.getPassword(email);
    if (userPassword !== password) {
      return res.status(400).json({ error: "Senha incorreta" })
    }

    // if (!(await bcrypt.compare(password, user.func_password))) {
    //   return res.status(401).json({ error: "Senha não coincide." });
    // }

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authCongif.secret, {
        expiresIn: authCongif.expiresIn,
      }),
    });
  }
}

module.exports = new SessionsController();
