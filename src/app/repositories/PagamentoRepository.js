const db = require("../../database/index");

class PagamentoRepository {
  async findAll(orderBy = "ASC") {
    const direction = orderBy.toUpperCase() === "change" ? "change" : "ASC";
    const rows = await db.query(
      `SELECT * FROM pagamentos ORDER BY pag_id ${direction}`
    );
    return rows;
  }

  async findById(id) {
    const [row] = await db.query(
      `
      SELECT * FROM pagamentos WHERE pag_id = $1`,
      [id]
    );
    return row;
  }
  // async findBytime(time) {
  //   const [row] = await db.query(
  //     `
  //     SELECT * FROM pagamentos WHERE pag_time = $1`,
  //     [time]
  //   );
  //   return row;
  // }

  async create({ pag_time, pag_value, pag_change, pag_payment, pag_ped_id }) {
    const [row] = await db.query(
      `INSERT INTO pagamentos(pag_time, pag_value, pag_change, pag_payment, pag_ped_id)
      VALUES( $1, $2, $3, $4, $5)
      RETURNING * `,
      [pag_time, pag_value, pag_change, pag_payment, pag_ped_id]
    );

    return row;
  }

  async update(pag_id, { pag_time, pag_value /*, pag_change, pag_payment, pag_ped_id */ }) {
    const [row] = await db.query(
      `UPDATE pagamentos
      SET pag_time = $1 , pag_value = $2
      WHERE pag_id = $3
      RETURNING *
      `,
      [pag_time, pag_value, pag_id]
    );
    return row;
  }

  async delete(id) {
    const deleteOp = await db.query(`DELETE FROM pagamentos WHERE pag_id = $1`, [
      id,
    ]);
    return deleteOp;
  }
}

export default new PagamentoRepository();
