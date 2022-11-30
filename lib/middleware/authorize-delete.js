module.exports = async (req, res, next) => {
  try {
    // do something
    console.log('in authorize-delete middleware::');
    next();
  } catch (err) {
    err.status = 403;
    next(err);
  }
};
