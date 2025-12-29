const prisma = require('../config/database');
const { NotFoundError } = require('../utils/errors');

const getPublicProfile = async (username) => {
  const profile = await prisma.profile.findUnique({
    where: { username },
    include: {
      links: {
        where: { isActive: true },
        orderBy: { position: 'asc' },
      },
    },
  });

  if (!profile || !profile.isPublic) {
    throw new NotFoundError('Profile not found');
  }

  // Increment view count
  await prisma.profile.update({
    where: { id: profile.id },
    data: { viewCount: { increment: 1 } },
  });

  return profile;
};

const trackLinkClick = async (username, linkId, metadata) => {
  const profile = await prisma.profile.findUnique({
    where: { username },
    include: { links: { where: { id: linkId } } },
  });

  if (!profile || profile.links.length === 0) {
    throw new NotFoundError('Link not found');
  }

  // Increment link click count
  await prisma.link.update({
    where: { id: linkId },
    data: { clickCount: { increment: 1 } },
  });

  // Record analytics
  await prisma.analytics.create({
    data: {
      profileId: profile.id,
      event: 'link_click',
      linkId,
      userAgent: metadata.userAgent,
      ipAddress: metadata.ipAddress,
      referrer: metadata.referrer,
    },
  });

  return { success: true };
};

module.exports = {
  getPublicProfile,
  trackLinkClick,
};