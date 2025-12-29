module.exports = {
  JWT_ACCESS_EXPIRY: '15m',
  JWT_REFRESH_EXPIRY: '7d',
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  USERNAME_REGEX: /^[a-zA-Z0-9_-]{3,30}$/,
  URL_REGEX: /^https?:\/\/.+/,
};