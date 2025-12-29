const prisma = require('../config/database');
const { uploadImage, deleteImage, extractPublicId } = require('./upload.service');
const { NotFoundError, ConflictError } = require('../utils/errors');

const getProfile = async (userId) => {
  const profile = await prisma.profile.findUnique({
    where: { userId },
    include: {
      links: {
        orderBy: { position: 'asc' },
      },
    },
  });

  if (!profile) {
    throw new NotFoundError('Profile not found');
  }

  return profile;
};

const updateProfile = async (userId, data) => {
  const { username, displayName, bio, themeColor, isPublic } = data;

  // Check if username is taken (if changing)
  if (username) {
    const existing = await prisma.profile.findFirst({
      where: {
        username,
        userId: { not: userId },
      },
    });
    if (existing) {
      throw new ConflictError('Username already taken');
    }
  }

  const profile = await prisma.profile.update({
    where: { userId },
    data: {
      ...(username && { username }),
      ...(displayName !== undefined && { displayName }),
      ...(bio !== undefined && { bio }),
      ...(themeColor && { themeColor }),
      ...(isPublic !== undefined && { isPublic }),
    },
  });

  return profile;
};

const uploadAvatar = async (userId, file) => {
  const profile = await prisma.profile.findUnique({
    where: { userId },
  });

  if (!profile) {
    throw new NotFoundError('Profile not found');
  }

  // Delete old avatar if exists
  if (profile.avatarUrl) {
    const publicId = extractPublicId(profile.avatarUrl);
    if (publicId) {
      try {
        await deleteImage(publicId);
      } catch (error) {
        console.error('Failed to delete old avatar:', error);
      }
    }
  }

  // Upload new avatar
  const result = await uploadImage(file.buffer, {
    folder: 'linkshare/avatars',
    transformation: [
      { width: 400, height: 400, crop: 'fill', gravity: 'face' },
      { quality: 'auto', fetch_format: 'auto' },
    ],
  });

  // Update profile with new avatar URL
  const updatedProfile = await prisma.profile.update({
    where: { userId },
    data: { avatarUrl: result.secure_url },
  });

  return updatedProfile;
};

const deleteAvatar = async (userId) => {
  const profile = await prisma.profile.findUnique({
    where: { userId },
  });

  if (!profile) {
    throw new NotFoundError('Profile not found');
  }

  // Delete from Cloudinary if exists
  if (profile.avatarUrl) {
    const publicId = extractPublicId(profile.avatarUrl);
    if (publicId) {
      try {
        await deleteImage(publicId);
      } catch (error) {
        console.error('Failed to delete avatar from Cloudinary:', error);
      }
    }
  }

  // Remove from database
  const updatedProfile = await prisma.profile.update({
    where: { userId },
    data: { avatarUrl: null },
  });

  return updatedProfile;
};

const checkUsernameAvailability = async (username) => {
  const existing = await prisma.profile.findUnique({
    where: { username },
  });

  return { available: !existing };
};

module.exports = {
  getProfile,
  updateProfile,
  uploadAvatar,
  deleteAvatar,
  checkUsernameAvailability,
};