const { Router } = require('express');
const { Restaurant } = require('../models/Restaurant.js');
const authenticate = require('../middleware/authenticate.js');
const { Review } = require('../models/Review.js');

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
      const review = await Review.insert({
        restaurantId: req.params.restId,
        userId: req.user.id,
        stars: req.body.stars,
        detail: req.body.detail,
      });
      res.json(review);
    } catch (e) {
      next(e);
    }
  });
