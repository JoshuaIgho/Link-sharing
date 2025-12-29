const multer = require('multer');
const { ValidationError } = require('../utils/errors');
const { MAX_FILE_SIZE, ALLOWED_IMAGE_TYPES } = require('../config/constants');

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  console.log('📎 File upload attempt:', file.originalname, file.mimetype);
  
  if (ALLOWED_IMAGE_TYPES.includes(file.mimetype)) {
    console.log('✅ File type accepted');
    cb(null, true);
  } else {
    console.log('❌ File type rejected');
    cb(new ValidationError('Only image files (JPEG, PNG, GIF, WebP) are allowed'), false);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter,
});

module.exports = upload;