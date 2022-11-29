const { Router } = require('express');
const { Restaurant } = require('../models/Restaurant.js');

module.exports = Router()
  .get('/:restId', async (req, res, next) => {
    try {
      const restaurant = await Restaurant.getById(req.params.restId);
      console.log('controller restaurant::', restaurant);
      //   restaurant.getReviews();
      res.json(restaurant);
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res, next) => {
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
