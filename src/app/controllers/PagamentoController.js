import PagamentoRepository from "../repositories/PagamentoRepository";

const db = require("../../database/index");

class PagamentoRepository {
  async findAll(orderBy = "ASC") {
    const direction = orderBy.toUpperCase() === "DESC" ? "DESC" : "ASC";
    const rows = await db.query(
      `SELECT * FROM pagamento ORDER BY pag_id ${direction}`
    );
    return rows;
  }

  async findById(id) {
    const [row] = await db.query(
      `
      SELECT * FROM pagamento WHERE pag_id = $1`,
      [id]
    );
    return row;
  }
  // async findByName(name) {
  //   const [row] = await db.query(
  //     `
  //     SELECT * FROM pagamento WHERE pag_name = $1`,
  //     [name]
  //   );
  //   return row;
  // }

  async create({ pag_value, pag_change, pag_note }) {
    const [row] = await db.query(
      `INSERT INTO pagamento(pag_value, pag_change, pag_note)
      VALUES( $1, $2, $3)
      RETURNING * `,
      [pag_value, pag_change, pag_note]
    );

    return row;
  }
}

export default new PagamentoRepository();
