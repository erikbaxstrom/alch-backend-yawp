const pool = require('../utils/pool');

class Restaurant {
  id;
  name;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
  }

  static async getAll() {
    console.log('center of the maze');
    const { rows } = await pool.query(
      `
        SELECT *
        FROM restaurants
        `
    );
    return rows;
  }
}

module.exports = { Restaurant };
