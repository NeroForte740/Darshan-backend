const dotenv = require("dotenv").config();
const cliente = require("../../config/db");


class ProdutosModel {
 
  async findAll() {
    const { data, error } = await cliente.supabase.from('produtos').select('*').limit('10');
    if (error) throw error;
    return data;
  }

  async findById(id) {
    const { data, error } = await cliente.supabase.from('produtos')
      .select('*').eq('prod_id', id).single();
    if (error) throw error;
    return data;
  }

  async create(product) {
    const { name, price, type, desc } = product;
    const { data, error } = await cliente.supabase.from('produtos')
      .insert({
        prod_name: name,
        prod_price: price, 
        prod_type: type, 
        prod_desc: desc 
      });
    if (error) throw error;
    return data;
  }

  async update(id, product) {
    const { name, price, type, desc } = product;
    const { data, error } = await cliente.supabase.from('produtos')
      .update({
        prod_name: name,
        prod_price: price, 
        prod_type: type, 
        prod_desc: desc
      })
      .eq('prod_id', id);
    if (error) throw error;
    return data;
  }

  async delete(id) {
    const { data, error } = await cliente.supabase.from('produtos').delete().eq('prod_id', id);
    if (error) throw error;
    return data;
  }
};

module.exports = new ProdutosModel();
