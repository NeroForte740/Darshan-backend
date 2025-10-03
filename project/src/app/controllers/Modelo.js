const dotenv = require("dotenv").config();
const cliente = require("../../config/db");

class UsuarioController {
  // Recupera todos os registros
  async index(req, res) {
    let { data } = await cliente.supabase.from("usuario").select("*");
    return res.send(data);
  }
  // Recupera um registro
  async show(req, res) {
    const id = parseInt(req.params.id);
    let { data } = await cliente.supabase.from("usuario").select().eq("id", id);
    return res.send(data);
  }
  // Cria um registro
  async create(req, res) {
    const { id, created_at, name, email, b_date } = req.body;
    const { data, error } = await cliente.supabase
      .from("usuario")
      .insert({
        id: id,
        created_at: created_at,
        name: name,
        email: email,
        b_date: b_date,
      })
      .select();
    return res.send(data);
  }
  // Atualiza um registro
  async update(req, res) {
    const id = parseInt(req.params.id);
    const { created_at, name, email, b_date } = req.body;
    const { data, error } = await cliente.supabase
      .from("usuario")
      .update({
        id: id,
        created_at: created_at,
        name: name,
        email: email,
        b_date: b_date,
      })
      .eq("id", id)
      .select();
    return res.send(data);
  }
  // Deleta um registro
  async destroy(req, res) {
    const id = parseInt(req.params.id);
    const response = await cliente.supabase
      .from("usuario")
      .delete()
      .eq("id", id);
    return res.send("Status 201");
  }
}
module.exports = new UsuarioController();
