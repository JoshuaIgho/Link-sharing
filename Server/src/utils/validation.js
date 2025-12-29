const { USERNAME_REGEX, URL_REGEX } = require('../config/constants');

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateUsername = (username) => {
  return USERNAME_REGEX.test(username);
};

const validateUrl = (url) => {
  return URL_REGEX.test(url);
};

const validatePassword = (password) => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  return password.length >= 8;
};

module.exports = {
  validateEmail,
  validateUsername,
  validateUrl,
  validatePassword,
};