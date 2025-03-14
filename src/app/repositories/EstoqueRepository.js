const db = require("../../database/index");

class EstoqueRepository {
  async findAll(orderBy = "ASC") {
    const direction = orderBy.toUpperCase() === "DESC" ? "DESC" : "ASC";
    const rows = await db.query(
      `SELECT * FROM produtos ORDER BY prod_id ${direction}`
    );
    return rows;
  }

  async findById(id) {
    const [row] = await db.query(
      `
      SELECT * FROM produtos WHERE prod_id = $1`,
      [id]
    );
    return row;
  }
  async findByName(name) {
    const [row] = await db.query(
      `
      SELECT * FROM produtos WHERE prod_name = $1`,
      [name]
    );
    return row;
  }

  async create({ prod_name, prod_price, prod_desc, prod_type }) {
    const [row] = await db.query(
      `INSERT INTO produtos(prod_name, prod_price, prod_desc, prod_type)
      VALUES( $1, $2, $3, $4)
      RETURNING * `,
      [prod_name, prod_price, prod_desc, prod_type]
    );

    return row;
  }

  async update(prod_id, { prod_name, prod_price /*, prod_desc, prod_type */ }) {
    const [row] = await db.query(
      `UPDATE produtos
      SET prod_name = $1 , prod_price = $2
      WHERE prod_id = $3
      RETURNING *
      `,
      [prod_name, prod_price, prod_id]
    );
    return row;
  }

  async delete(id) {
    const deleteOp = await db.query(`DELETE FROM produtos WHERE prod_id = $1`, [
      id,
    ]);
    return deleteOp;
  }
}

export default new EstoqueRepository();
