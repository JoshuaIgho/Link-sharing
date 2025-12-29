const router = require('express').Router();
const analyticsController = require('../controllers/analytics.controller');
const auth = require('../middleware/auth');

router.get('/overview', auth, analyticsController.getOverview);
router.get('/links', auth, analyticsController.getLinkAnalytics);

module.exports = router;