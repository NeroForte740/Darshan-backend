const dotenv = require("dotenv").config();
const cliente = require("../../config/db");

class PagamentosModel {
 
  async findAll() {
    const { data, error } = await cliente.supabase.from("pagamentos").select("*");
    if (error) throw error;
    return data;
  }

  async findById(id) {
    const { data, error } = await cliente.supabase.from("pagamentos").select().eq("pag_id", id);
    if (error) throw error;
    return data;
  }

  async create({ id, value, payment, change }) {
    const { data, error } = await cliente.supabase
      .from("pagamentos")
      .insert({
        pag_id: id,
        pag_value: value,
        pag_payment: payment,
        pag_change: change,
        
      })
      .select();
    if (error) throw error;
    return data;
  }

  async update(id, { value, change, payment, created_at }) {
    const { data, error } = await cliente.supabase
      .from("pagamentos")
      .update({
        pag_value: value,
        pag_change: change,
        pag_payment: payment,
        created_at,
      })
      .eq("pag_id", id)
      .select();
    if (error) throw error;
    return data;
  }

  async delete(id) {
    const { error } = await cliente.supabase.from("pagamentos").delete().eq("pag_id", id);
    if (error) throw error;
    return true;
  }
}

module.exports = new PagamentosModel();
