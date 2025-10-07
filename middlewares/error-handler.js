const errorHandler = (err, req, res, next) => {
  console.error(err);

  const { statusCode = 500, message } = err;

  if (statusCode === 500) {
    res.status(500).send({ message: "An error occurred on the server" });
  } else {
    res.status(statusCode).send({ message });
  }
};

module.exports = errorHandler;
