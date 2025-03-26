const db = require("../../database/index");

class PedidosRepository {
  async findAll(orderBy = "ASC") {
    const direction = orderBy.toUpperCase() === "DESC" ? "DESC" : "ASC";
    const rows = await db.query(
      `SELECT * FROM pedidos ORDER BY ped_id ${direction}`
    );
    return rows;
  }

  async findById(id) {
    const [row] = await db.query(
      `
      SELECT * FROM pedidos WHERE ped_id = $1`,
      [id]
    );
    return row;
  }

  async create({ ped_description, ped_totalprice, ped_status_preparo, ped_status_pag, ped_cliente, ped_priori }) {
    const [row] = await db.query(
      `INSERT INTO pedidos(ped_description, ped_totalprice, ped_status_preparo, ped_status_pag, ped_cliente, ped_priori)
      VALUES( $1, $2, $3, $4, $5, $6)
      RETURNING * `,
      [ped_description, ped_totalprice, ped_status_preparo, ped_status_pag, ped_cliente, ped_priori]
    );

    return row;
  }

  async update(ped_id, { ped_description, ped_totalprice, ped_status_preparo,
     ped_status_pag, ped_cliente, ped_priori}) {
    const [row] = await db.query(
      `UPDATE pedidos
      SET ped_description = $2 , ped_totalprice = $3
      WHERE ped_id = $1
      RETURNING *
      `,
      [ped_id, ped_description, ped_totalprice, ped_status_preparo,
        ped_status_pag, ped_cliente, ped_priori ]
    );
    return row;
  }

  async delete(id) {
    const deleteOp = await db.query(`DELETE FROM pedidos WHERE ped_id = $1`, [
      id,
    ]);
    return deleteOp;
  }
}

export default new PedidosRepository();
