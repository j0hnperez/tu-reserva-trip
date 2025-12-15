const methodOverride = (req, res, next) => {
  const method = req.body._method;
  if (method) {
    req.method = method.toUpperCase();
  }
  next();
};

module.exports = methodOverride;
