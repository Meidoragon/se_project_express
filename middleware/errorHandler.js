function errorHandler(err, req, res, next) {
  console.error(`error name: ${err.name}`);
  console.error(`error status code: ${err.status}`);
  console.error(`error message: ${err.message}`);
  res.status(err.status || 500).send({ message: err.message });
}

module.exports = errorHandler;
