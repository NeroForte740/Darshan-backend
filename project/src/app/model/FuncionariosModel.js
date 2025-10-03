const dotenv = require("dotenv").config();
const cliente = require("../../config/db");

class FuncionariosModel {
  async findAll() {
    const { data, error } = await cliente.supabase
      .from("funcionarios")
      .select("*");
    if (error) throw error;
    return data;
  }

  async findById(id) {
    const { data, error } = await cliente.supabase
      .from("funcionarios")
      .select()
      .eq("func_id", id);
    if (error) throw error;
    return data;
  }
  async findByEmail(email) {
    const { data, error } = await cliente.supabase
      .from("funcionarios")
      .select()
      .eq("func_email", email);
    if (error) throw error;
    return data;
  }

  async getPassword(email) {
    const { data, error } = await cliente.supabase
      .from("funcionarios")
      .select("func_password")
      .eq("func_email", email)
      .single();

    if (error) {
      throw new Error(`Erro ao buscar senha: ${error.message}`);
    }

    return data.func_password;
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
    const { error } = await cliente.supabase
      .from("funcionarios")
      .delete()
      .eq("func_id", id);
    if (error) throw error;
    return true;
  }
}

module.exports = new FuncionariosModel();
