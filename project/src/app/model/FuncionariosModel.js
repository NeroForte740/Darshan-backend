const dotenv = require("dotenv").config();
const cliente = require("../../config/db");

class FuncionariosModel {
 
  async findAll() {
    const { data, error } = await cliente.supabase.from("funcionarios").select("*");
    if (error) throw error;
    return data;
  }

  async findById(id) {
    const { data, error } = await cliente.supabase.from("funcionarios").select().eq("func_id", id);
    if (error) throw error;
    return data;
  }

  async create({ name, email, password, level }) {
    const { data, error } = await cliente.supabase
      .from("funcionarios")
      .insert({
        func_name: name,
        func_email: email,
        func_password: password,
        func_level: level,
      })
      .select();
    if (error) throw error;
    return data;
  }

  async update(id, { name, email, password, level }) {
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
    if (error) throw error;
    return data;
  }

  async delete(id) {
    const { error } = await cliente.supabase.from("funcionarios").delete().eq("func_id", id);
    if (error) throw error;
    return true;
  }
}

module.exports = new FuncionariosModel();
