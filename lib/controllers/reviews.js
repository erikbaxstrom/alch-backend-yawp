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
      //   const review = await Review.getById(req.params.id);
    } catch (e) {
      next(e);
    }
  }
);
