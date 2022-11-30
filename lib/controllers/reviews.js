const { Router } = require('express');
const authenticate = require('../middleware/authenticate.js');
const authorizeDelete = require('../middleware/authorize-delete.js');
const { Review } = require('../models/Review.js');

module.exports = Router().delete(
  '/:restId',
  [authenticate, authorizeDelete],
  async (req, res, next) => {
    try {
      //something
      console.log('in reviews controller');
      next();
    } catch (e) {
      next(e);
    }
  }
);
