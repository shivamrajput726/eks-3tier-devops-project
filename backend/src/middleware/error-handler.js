function notFoundHandler(req, res) {
  res.status(404).json({
    message: `route not found: ${req.method} ${req.originalUrl}`,
  });
}

function errorHandler(error, _req, res, _next) {
  if (res.headersSent) {
    return;
  }

  const statusCode = error.statusCode || 500;
  res.status(statusCode).json({
    message: error.message || "internal server error",
  });
}

module.exports = {
  notFoundHandler,
  errorHandler,
};
