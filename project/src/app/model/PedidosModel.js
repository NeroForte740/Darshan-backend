const dotenv = require("dotenv").config();
const cliente = require("../../config/db");

class PedidoModel {
  async findAll() {
    const { data, error } = await cliente.supabase.from("pedidos").select(`
        *,
        pedido_produto (
          quantidade,
          produtos (*)
        )
      `);
    if (error) throw error;
    return data;
  }

  async findById(id) {
    const { data, error } = await cliente.supabase
      .from("pedidos")
      .select(
        `
        *,
        pedido_produto (
          quantidade,
          produtos (*)
        )
      `
      )
      .eq("ped_id", id)
      .single();
    if (error) throw error;
    return data;
  }

  async create(pedido) {
    const {
      description,
      status_preparo,
      status_pag,
      client,
    } = pedido;

    // Cria o pedido
    const { data: newPedido, error: pedidoError } = await cliente.supabase
      .from("pedidos")
      .insert([
        {
          ped_description: description,
          ped_status_preparo: status_preparo,
          ped_status_pag: status_pag,
          ped_client: client,
        },
      ])
      .select()
      .single();

    if (pedidoError) throw pedidoError;

    return newPedido;
  }

  async update(id, pedido) {
    if (!pedido) {
      throw new Error("O objeto 'pedido' não foi fornecido.");
    }
    // Atualiza os dados do pedido
    const {
      description,
      status_preparo,
      status_pag,
      client,
    } = pedido;

    const { data: updatedPedido, error: pedidoError } = await cliente.supabase
      .from("pedidos")
      .update({
        ped_description: description,
        ped_status_preparo: status_preparo,
        ped_status_pag: status_pag,
        ped_client: client,
        updated_at: new Date().toISOString(),
      })
      .eq("ped_id", id)
      .select()
      .single();

    if (pedidoError) throw pedidoError;

    return updatedPedido;
  }

  async delete(id) {
    const { data, error } = await cliente.supabase
      .from("pedidos")
      .delete()
      .eq("ped_id", id);

    if (error) throw error;
    return data;
  }
}

module.exports = new PedidoModel();
