const { body, param, validationResult } = require('express-validator');
const { ValidationError } = require('../utils/errors');
const { validateEmail, validateUsername, validateUrl, validatePassword } = require('../utils/validation');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ValidationError(errors.array()[0].msg);
  }
  next();
};

const validateRegistration = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .custom(validateEmail).withMessage('Invalid email format'),
  body('password')
    .notEmpty().withMessage('Password is required')
    .custom(validatePassword).withMessage('Password must be at least 8 characters'),
  body('username')
    .trim()
    .notEmpty().withMessage('Username is required')
    .custom(validateUsername).withMessage('Username must be 3-30 characters (letters, numbers, _ or -)'),
  validate,
];

const validateLogin = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .custom(validateEmail).withMessage('Invalid email format'),
  body('password').notEmpty().withMessage('Password is required'),
  validate,
];

const validateProfile = [
  body('username')
    .optional()
    .trim()
    .custom(validateUsername).withMessage('Username must be 3-30 characters (letters, numbers, _ or -)'),
  body('displayName')
    .optional()
    .trim()
    .isLength({ max: 50 }).withMessage('Display name must be under 50 characters'),
  body('bio')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('Bio must be under 500 characters'),
  body('themeColor')
    .optional()
    .matches(/^#[0-9A-Fa-f]{6}$/).withMessage('Invalid hex color'),
  validate,
];

const validateLink = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ max: 100 }).withMessage('Title must be under 100 characters'),
  body('url')
    .trim()
    .notEmpty().withMessage('URL is required')
    .custom(validateUrl).withMessage('Invalid URL format'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 200 }).withMessage('Description must be under 200 characters'),
  validate,
];

const validateReorder = [
  body('linkId').notEmpty().withMessage('Link ID is required'),
  body('newPosition').isInt({ min: 0 }).withMessage('Position must be a non-negative integer'),
  validate,
];

const validateUsernameParam = [
  param('username')
    .trim()
    .notEmpty().withMessage('Username is required'),
  validate,
];

module.exports = {
  validateRegistration,
  validateLogin,
  validateProfile,
  validateLink,
  validateReorder,
  validateUsernameParam,
};