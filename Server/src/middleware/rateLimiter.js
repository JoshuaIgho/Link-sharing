const rateLimit = require('express-rate-limit');

const createLimiter = (windowMs, max, message) => {
  return rateLimit({
    windowMs,
    max,
    message: { success: false, message },
    standardHeaders: true,
    legacyHeaders: false,
  });
};

module.exports = {
  auth: createLimiter(15 * 60 * 1000, 5, 'Too many authentication attempts'),
  api: createLimiter(15 * 60 * 1000, 100, 'Too many requests'),
  public: createLimiter(1 * 60 * 1000, 60, 'Too many requests'),
};