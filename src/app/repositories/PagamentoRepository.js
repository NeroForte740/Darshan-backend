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

  async create({ pag_value, pag_change, pag_payment, pag_ped_id }) {
    const [row] = await db.query(
      `INSERT INTO pagamentos(pag_value, pag_change, pag_payment, pag_ped_id)
      VALUES( $1, $2, $3, $4)
      RETURNING * `,
      [pag_value, pag_change, pag_payment, pag_ped_id]
    );

    return row;
  }

  async update(pag_id, { pag_value, pag_change, pag_payment, pag_ped_id }) {
    const [row] = await db.query(
      `UPDATE pagamentos
      SET pag_value = $2 , pag_change = $3 , pag_payment = $4 , pag-ped_id = $5
      WHERE pag_id = $1
      RETURNING *
      `,
      [pag_id, pag_value, pag_change, pag_payment, pag_ped_id]
    );
    return row;
  }

  async delete(id) {
    const deleteOp = await db.query(
      `DELETE FROM pagamentos WHERE pag_id = $1`,
      [id]
    );
    return deleteOp;
  }
}

export default new PagamentoRepository();
