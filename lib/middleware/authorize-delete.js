// const users = require('../controllers/users.js');
const { Review } = require('../models/Review.js');

module.exports = async (req, res, next) => {
  try {
    // do something
    // console.log('in authorize-delete middleware::', req.params.id);
    //get review by id
    const review = await Review.getById(req.params.id);
    console.log('gotById::', review);
    // confirm user attached to req
    if (!req.user) {
      throw new Error('Not Authorized');
    }
    if (!(req.user.email === 'admin' || req.user.id === review.userId)) {
      throw new Error('Not Authorized');
    }
    // confirm req user id matches review's user id -or- user is admin
    // if yes, call next. if not, throw new error 'not authorized'
    next();
  } catch (err) {
    console.log('caught error');
    err.status = 401;
    next(err);
  }
};
