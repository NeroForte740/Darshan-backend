const db = require("../../database/index");

class FuncionarioRepository {
  async findAll(orderBy = "ASC") {
    const direction = orderBy.toUpperCase() === "DESC" ? "DESC" : "ASC";
    const rows = await db.query(
      `SELECT * FROM funcionarios ORDER BY func_id ${direction}`
    );
    return rows;
  }

  async findById(id) {
    const [row] = await db.query(
      `
      SELECT * FROM funcionarios WHERE func_id = $1`,
      [id]
    );
    return row;
  }

  async findByName(name) {
    const [row] = await db.query(
      `
      SELECT * FROM funcionarios WHERE func_name = $1`,
      [name]
    );
    return row;
  }

  async create({ func_name, func_email, func_password, func_level }) {
    const [row] = await db.query(
      `INSERT INTO funcionarios(func_name, func_email, func_password, func_level)
      VALUES( $1, $2, $3, $4)
      RETURNING * `,
      [func_name, func_email, func_password, func_level]
    );

    return row;
  }

  async update(func_id, { func_name, func_email , func_password, func_level  }) {
      const [row] = await db.query(
        `UPDATE funcionarios
        SET func_name = $2 , func_email = $3 , func_passowrd = $4 , func_level = $5
        WHERE func_id = $1
        RETURNING *
        `,
        [func_id, func_name, func_email, func_password, func_level]
      );
      return row;
    }

    async delete(id) {
      const deleteOp = await db.query(`DELETE FROM funcionarios WHERE func_id = $1`, [
        id,
      ]);
      return deleteOp;
    }

}

export default new FuncionarioRepository();
