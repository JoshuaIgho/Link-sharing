const analyticsService = require('../services/analytics.service');

const getOverview = async (req, res, next) => {
  try {
    const overview = await analyticsService.getOverview(req.userId);
    res.json({ success: true, data: overview });
  } catch (error) {
    next(error);
  }
};

const getLinkAnalytics = async (req, res, next) => {
  try {
    const analytics = await analyticsService.getLinkAnalytics(req.userId);
    res.json({ success: true, data: analytics });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getOverview,
  getLinkAnalytics,
};