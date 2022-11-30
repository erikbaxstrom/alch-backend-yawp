const { Review } = require('../models/Review.js');

module.exports = async (req, res, next) => {
  try {
    const review = await Review.getById(req.params.id);
    if (!req.user) {
      throw new Error('Not Authorized');
    }
    if (!(req.user.email === 'admin' || req.user.id === review.userId)) {
      throw new Error('Not Authorized');
    }
    next();
  } catch (err) {
    err.status = 401;
    next(err);
  }
};
