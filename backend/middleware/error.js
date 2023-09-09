const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  //handle mongodb id//cast error
  if (err.name === "CastError") {
    const message = `Resource not found: invaild ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // Send JSON response
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
