import { USERNAME_REGEX, URL_REGEX } from './constants';

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateUsername = (username) => {
  return USERNAME_REGEX.test(username);
};

export const validateUrl = (url) => {
  return URL_REGEX.test(url);
};

export const validatePassword = (password) => {
  return password.length >= 8;
};

export const validateFile = (file, maxSize, allowedTypes) => {
  if (file.size > maxSize) {
    return { valid: false, error: 'File size exceeds limit' };
  }
  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'Invalid file type' };
  }
  return { valid: true };
};