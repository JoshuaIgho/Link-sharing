const router = require('express').Router();
const publicController = require('../controllers/public.controller');
const rateLimiter = require('../middleware/rateLimiter');

router.get('/:username', rateLimiter.public, publicController.getPublicProfile);
router.post('/:username/links/:linkId/click', rateLimiter.public, publicController.trackLinkClick);

module.exports = router;