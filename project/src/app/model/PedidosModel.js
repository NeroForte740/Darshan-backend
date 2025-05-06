const dotenv = require("dotenv").config();
const cliente = require("../../config/db");

class PedidoModel {
    async findAll() {
      const { data, error } = await cliente.supabase
        .from('pedidos')
        .select(`
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
        .from('pedidos')
        .select(`
          *,
          pedido_produto (
            quantidade,
            produtos (*)
          )
        `)
        .eq('id', id)
        .single();
      if (error) throw error;
      return data;
    }
  
    async create(pedido, produtoIdsComQuantidades) {
      const { description, totalprice, status_preparo, status_pag, client, priority } = pedido;
  
      // Cria o pedido
      const { data: newPedido, error: pedidoError } = await cliente.supabase
        .from('pedidos')
        .insert([{
            ped_description: description,
            ped_totalprice: totalprice,
            ped_status_preparo: status_preparo,
            ped_status_pag: status_pag,
            ped_cliente: client,
            ped_priori: priority
        }])
        .select()
        .single();
  
      if (pedidoError) throw pedidoError;
  
      // Relaciona produtos ao pedido
      const relacoes = produtoIdsComQuantidades.map(({ produto_id, quantidade }) => ({
        pedido_id: newPedido.id,
        produto_id,
        quantidade: quantidade || 1
      }));
  
      const { error: relError } = await cliente.supabase
        .from('pedido_produto')
        .insert(relacoes);
  
      if (relError) throw relError;
  
      return newPedido;
    }

    async update(id, pedido, produtoIdsComQuantidades) {
      // Atualiza os dados do pedido
      const { description, totalprice, status_preparo, status_pag, client, priority } = pedido;
      
      const { data: updatedPedido, error: pedidoError } = await cliente.supabase
      .from('pedidos')
      .update({
        ped_description: description,
        ped_totalprice: totalprice,
        ped_status_preparo: status_preparo,
        ped_status_pag: status_pag,
        ped_cliente: client,
        ped_priori: priority
      })
      .eq('ped_id', id).select().single();
      
      if (pedidoError) throw pedidoError;
      
      // Remove as relações antigas
      const { error: deleteRelationsError } = await supabase
      .from('pedido_produto')
      .delete()
      .eq('pedido_id', id);
      
      if (deleteRelationsError) throw deleteRelationsError;
      
      // Insere as novas relações
      const novasRelacoes = produtoIdsComQuantidades.map(({ produto_id, quantidade }) => ({
        pedido_id: id,
        produto_id,
        quantidade: quantidade || 1
      }));
      
      const { error: insertError } = await supabase
        .from('pedido_produto')
        .insert(novasRelacoes);
      if (insertError) throw insertError;
      
      return updatedPedido;
    }

    async delete(id) {
        // Opcional: excluir relações manualmente
        await supabase.from('pedido_produto').delete().eq('pedido_id', id);
      
        const { data, error } = await supabase
          .from('pedidos')
          .delete()
          .eq('ped_id', id);
      
        if (error) throw error;
        return data;
    }

};
  
module.exports = new PedidoModel();