const { Router } = require('express');
const authenticate = require('../middleware/authenticate.js');
const authorizeDelete = require('../middleware/authorize-delete.js');
const { Review } = require('../models/Review.js');

module.exports = Router().delete(
  '/:id',
  [authenticate, authorizeDelete],
  async (req, res, next) => {
    try {
      console.log('in reviews controller');
      const deletedReview = await Review.deleteById(req.params.id);
      res.status(204);
      res.json(deletedReview);
    } catch (e) {
      next(e);
    }
  }
);
