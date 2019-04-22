//eslint-disable-next-line no-unused-vars
module.exports = (req, res, next) => {
  const error = new Error('404 Not Found Frens');
  error.status = 404;
  next(error);
};
