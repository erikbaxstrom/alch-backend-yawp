const pool = require('../utils/pool');

class Restaurant {
  id;
  name;
  cost;
  cuisine;
  image;
  website;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.cost = row.cost;
    this.cuisine = row.cuisine;
    this.image = row.image;
    this.website = row.website;
    this.reviews = row.reviews;
  }

  static async getAll() {
    const { rows } = await pool.query(
      `
        SELECT *
        FROM restaurants
        `
    );
    return rows;
  }

  static async getById(restId) {
    const { rows } = await pool.query(
      `
    SELECT restaurants.*, coalesce(
    json_agg(to_jsonb(reviews))
    FILTER (WHERE reviews.id IS NOT NULL), '[]') AS reviews
    FROM restaurants
    LEFT JOIN reviews ON restaurants.id = reviews.restaurant_id
    WHERE restaurants.id = $1
    GROUP BY restaurants.id;
    `,
      [restId]
    );
    console.log('rows::', rows[0]);
    if (!rows) return null;
    return new Restaurant(rows[0]);
  }

  //   async getReviews() {
  //     const { reviews } = await pool.query(
  //       `
  //         SELECT *
  //         FROM restaurants
  //         WHERE id = $1
  //         `,
  //       [this.id]
  //     );
  //     console.log('reviews::', reviews);
  //   }
}

module.exports = { Restaurant };
