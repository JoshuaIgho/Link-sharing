const publicService = require('../services/public.service');

const getPublicProfile = async (req, res, next) => {
  try {
    const { username } = req.params;
    const profile = await publicService.getPublicProfile(username);
    res.json({ success: true, data: profile });
  } catch (error) {
    next(error);
  }
};

const trackLinkClick = async (req, res, next) => {
  try {
    const { username, linkId } = req.params;
    const metadata = {
      userAgent: req.headers['user-agent'],
      ipAddress: req.ip,
      referrer: req.headers.referer,
    };
    const result = await publicService.trackLinkClick(username, linkId, metadata);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPublicProfile,
  trackLinkClick,
};