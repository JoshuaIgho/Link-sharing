const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const { validateRegistration, validateLogin } = require('../middleware/validator');
const rateLimiter = require('../middleware/rateLimiter');
const auth = require('../middleware/auth');

router.post('/register', rateLimiter.auth, validateRegistration, authController.register);
router.post('/login', rateLimiter.auth, validateLogin, authController.login);
router.post('/refresh', authController.refreshToken);
router.get('/me', auth, authController.getCurrentUser);

module.exports = router;