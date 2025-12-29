const profileService = require('../services/profile.service');

const getProfile = async (req, res, next) => {
  try {
    console.log('👤 Get profile for user:', req.userId);
    const profile = await profileService.getProfile(req.userId);
    res.json({ success: true, data: profile });
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    console.log('📝 Update profile for user:', req.userId);
    const profile = await profileService.updateProfile(req.userId, req.body);
    res.json({ success: true, data: profile });
  } catch (error) {
    next(error);
  }
};

const uploadAvatar = async (req, res, next) => {
  try {
    console.log('📤 Upload avatar for user:', req.userId);
    console.log('📎 File:', req.file ? req.file.originalname : 'NO FILE');
    
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }
    
    const profile = await profileService.uploadAvatar(req.userId, req.file);
    res.json({ success: true, data: profile });
  } catch (error) {
    console.error('❌ Upload avatar error:', error);
    next(error);
  }
};

const deleteAvatar = async (req, res, next) => {
  try {
    console.log('🗑️ Delete avatar for user:', req.userId);
    const profile = await profileService.deleteAvatar(req.userId);
    res.json({ success: true, data: profile });
  } catch (error) {
    next(error);
  }
};

const checkUsernameAvailability = async (req, res, next) => {
  try {
    const { username } = req.params;
    console.log('🔍 Check username availability:', username);
    const result = await profileService.checkUsernameAvailability(username);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProfile,
  updateProfile,
  uploadAvatar,
  deleteAvatar,
  checkUsernameAvailability,
};