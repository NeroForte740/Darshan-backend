const dotenv = require("dotenv").config();
const cliente = require("../../config/db");

class FuncionariosController {
// Recupera todos os registros
  async index(req, res) {
    let { data } = await cliente.supabase.from("funcionarios").select("*");
    return res.send(data);
  }
  // Recupera um registro
  async show(req, res) {
    const id = parseInt(req.params.id);
    let { data } = await cliente.supabase.from("funcionarios").select().eq("func_id", id);
    return res.send(data);
  }
  // Cria um registro
  async create(req, res) {
    const { name, email, password, level } = req.body;
    const { data, error } = await cliente.supabase
      .from("funcionarios")
      .insert({
        func_name: name,
        func_email: email,
        func_password: password,
        func_level: level,
      })
      .select();
    return res.send(data);
  }
  // Atualiza um registro
  async update(req, res) {
    const id = parseInt(req.params.id);
    const { name, email, password, level } = req.body;
    const { data, error } = await cliente.supabase
      .from("funcionarios")
      .update({
        func_name: name,
        func_email: email,
        func_password: password,
        func_level: level,
      })
      .eq("func_id", id)
      .select();
    return res.send(data);
  }
  // Deleta um registro
  async destroy(req, res) {
    const id = parseInt(req.params.id);
    const response = await cliente.supabase
      .from("funcionarios")
      .delete()
      .eq("func_id", id);
    return res.send("Status 201");
  }
}
module.exports = new FuncionariosController();
