// not found
const notFound = (req, res, next) => {
  const error = new Error(`Not found: ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// error handler
const errorHandler = (err, req, res, next) => {
  console.log(err);
  const statusCode = res.statusCode == 200 ? 500 : res.statusCode;
  res.status(statusCode).json({ status: 'fail', message: err?.message || '', stack: err?.stack || '' });
};

module.exports = { errorHandler, notFound };
