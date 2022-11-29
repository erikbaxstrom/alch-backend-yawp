const { Router } = require('express');
const { Restaurant } = require('../models/Restaurant.js');
const authenticate = require('../middleware/authenticate.js');

module.exports = Router()
  .get('/:restId', async (req, res, next) => {
    try {
      const restaurant = await Restaurant.getById(req.params.restId);
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
  })
  .post('/:restId/reviews', [authenticate], async (req, res, next) => {
    try {
      console.log('in controller, running ID::', req.params.restId);
      //   const response = await Restaurant.addReview(req.)
    } catch (e) {
      next(e);
    }
  });
