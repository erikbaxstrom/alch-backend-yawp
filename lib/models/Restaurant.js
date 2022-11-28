const pool = require('../utils/pool');

class Restaurant {
  id;
  name;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
  }
}

module.exports = { Restaurant };
