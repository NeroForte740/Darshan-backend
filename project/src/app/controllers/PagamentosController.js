const dotenv = require("dotenv").config();
const cliente = require("../../config/db");

class PagamentosController {
  // Recupera todos os registros
  async index(req, res) {
    let { data } = await cliente.supabase.from("pagamentos").select("*");
    return res.send(data);
  }
  // Recupera um registro
  async show(req, res) {
    const id = parseInt(req.params.id);
    let { data } = await cliente.supabase.from("pagamentos").select().eq("pag_id", id);
    return res.send(data);
  }
  // Cria um registro
  async create(req, res) {
    const { id, created_at, name, email, b_date } = req.body;
    const { data, error } = await cliente.supabase
      .from("pagamentos")
      .insert({
        pag_id: id,
        pag_value: value,
        pag_change : change,
        pag_note: Note,
        created_at: created_at,
      })
      .select();
    return res.send(data);
  }
  // Atualiza um registro
  async update(req, res) {
    const id = parseInt(req.params.id);
    const { created_at, name, email, b_date } = req.body;
    const { data, error } = await cliente.supabase
      .from("pagamentos")
      .update({
        pag_id: id,
        pag_value: value,
        pag_change : change,
        pag_note: Note,
        created_at: created_at,
      })
      .eq("pag_id", id)
      .select();
    return res.send(data);
  }
  // Deleta um registro
  async destroy(req, res) {
    const id = parseInt(req.params.id);
    const response = await cliente.supabase
      .from("pagamentos")
      .delete()
      .eq("pag_id", id);
    return res.send("Status 201");
  }
}
module.exports = new PagamentosController();
