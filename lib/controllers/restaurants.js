const { Router } = require('express');
const { Restaurant } = require('../models/Restaurant.js');

module.exports = Router().get('/', async (req, res, next) => {
  try {
    const restaurants = await Restaurant.getAll();
    const filteredRestaurants = restaurants.map(({ id, name }) => ({
      id,
      name,
    }));
    res.json(filteredRestaurants);
  } catch (e) {
    next(e);
  }
});
