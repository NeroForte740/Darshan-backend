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

  async create(id) {
     const { data: pedidoData, error: pedidoError } = await cliente.supabase
        .from("pedidos")
        .select("*")
        .eq("ped_id", id)
        .single();
      
     if (pedidoError) throw pedidoError;
     
     const pedidoParaFinalizar = {
       ped_id: pedidoData.ped_id,
       ped_description: pedidoData.ped_description,
       ped_status_preparo: pedidoData.ped_status_preparo,
       ped_status_pag: pedidoData.ped_status_pag,
       ped_client: pedidoData.ped_client,
       created_at: pedidoData.created_at,
       updated_at: new Date().toISOString()
     };
     
     const { data: finalizadoData, error: finalizadoError } = await cliente.supabase
        .from("finalizados")
        .insert(pedidoParaFinalizar)
        .select()
        .single();
        
     if (finalizadoError) {
       console.error("Erro ao finalizar pedido:", finalizadoError);
       throw finalizadoError;
     }
     
     const { error: deleteError } = await cliente.supabase
        .from("pedidos")
        .delete()
        .eq("ped_id", id);
        
     if (deleteError) {
       console.error("Erro ao remover pedido original:", deleteError);
     }
     
     return finalizadoData;
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
      .from("finalizados")
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
      .from("finalizados")
      .delete()
      .eq("ped_id", id);

    if (error) throw error;
    return data;
  }
}

module.exports = new PedidoModel();
