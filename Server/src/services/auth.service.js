const prisma = require('../config/database');
const { hashPassword, comparePassword } = require('../utils/password');
const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require('../utils/jwt');
const { ValidationError, UnauthorizedError, ConflictError } = require('../utils/errors');

const register = async (email, password, username) => {
  // Check if user exists
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new ConflictError('Email already registered');
  }

  // Check if username exists
  const existingProfile = await prisma.profile.findUnique({ where: { username } });
  if (existingProfile) {
    throw new ConflictError('Username already taken');
  }

  // Hash password
  const passwordHash = await hashPassword(password);

  // Create user and profile in transaction
  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
      profile: {
        create: {
          username,
          displayName: username,
        },
      },
    },
    include: {
      profile: true,
    },
  });

  // Generate tokens
  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  return {
    user: {
      id: user.id,
      email: user.email,
      profile: user.profile,
    },
    accessToken,
    refreshToken,
  };
};

const login = async (email, password) => {
  // Find user
  const user = await prisma.user.findUnique({
    where: { email },
    include: { profile: true },
  });

  if (!user) {
    throw new UnauthorizedError('Invalid credentials');
  }

  // Verify password
  const isValid = await comparePassword(password, user.passwordHash);
  if (!isValid) {
    throw new UnauthorizedError('Invalid credentials');
  }

  // Generate tokens
  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  return {
    user: {
      id: user.id,
      email: user.email,
      profile: user.profile,
    },
    accessToken,
    refreshToken,
  };
};

const refreshAccessToken = async (refreshToken) => {
  const decoded = verifyRefreshToken(refreshToken);
  const accessToken = generateAccessToken(decoded.userId);
  return { accessToken };
};

const getCurrentUser = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { profile: true },
  });

  if (!user) {
    throw new UnauthorizedError('User not found');
  }

  return user;
};

module.exports = {
  register,
  login,
  refreshAccessToken,
  getCurrentUser,
};