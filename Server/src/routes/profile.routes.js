const router = require('express').Router();
const profileController = require('../controllers/profile.controller');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const { validateProfile } = require('../middleware/validator');

router.get('/', auth, profileController.getProfile);
router.put('/', auth, validateProfile, profileController.updateProfile);
router.post('/avatar', auth, upload.single('avatar'), profileController.uploadAvatar);
router.delete('/avatar', auth, profileController.deleteAvatar);
router.get('/availability/:username', profileController.checkUsernameAvailability);

module.exports = router;