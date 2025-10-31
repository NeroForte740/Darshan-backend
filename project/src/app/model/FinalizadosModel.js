const dotenv = require("dotenv").config();
const cliente = require("../../config/db");

class PedidoModel {
  async findAll() {
    const { data, error } = await cliente.supabase.from("finalizados").select(`
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
      .from("finalizados")
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
      totalprice,
      status_preparo,
      status_pag,
      client,
      priority,
    } = pedido;

    // Cria o pedido
    const { data: newPedido, error: pedidoError } = await cliente.supabase
      .from("finalizados")
      .insert([
        {
          ped_description: description,
          ped_totalprice: totalprice,
          ped_status_preparo: status_preparo,
          ped_status_pag: status_pag,
          ped_client: client,
          ped_priori: priority,
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
      totalprice,
      status_preparo,
      status_pag,
      client,
      priority,
    } = pedido;

    const { data: updatedPedido, error: pedidoError } = await cliente.supabase
      .from("finalizados")
      .update({
        ped_description: description,
        ped_totalprice: totalprice,
        ped_status_preparo: status_preparo,
        ped_status_pag: status_pag,
        ped_client: client,
        ped_priori: priority,
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
      .from("finalizados")
      .delete()
      .eq("ped_id", id);

    if (error) throw error;
    return data;
  }
}

module.exports = new PedidoModel();
