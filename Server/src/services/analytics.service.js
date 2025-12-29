const prisma = require('../config/database');
const { NotFoundError } = require('../utils/errors');

const getOverview = async (userId) => {
  const profile = await prisma.profile.findUnique({
    where: { userId },
    include: {
      links: true,
      analytics: {
        where: {
          createdAt: {
            gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days
          },
        },
      },
    },
  });

  if (!profile) {
    throw new NotFoundError('Profile not found');
  }

  const totalClicks = profile.links.reduce((sum, link) => sum + link.clickCount, 0);
  const profileViews = profile.analytics.filter(a => a.event === 'profile_view').length;
  const linkClicks = profile.analytics.filter(a => a.event === 'link_click').length;

  return {
    totalLinks: profile.links.length,
    activeLinks: profile.links.filter(l => l.isActive).length,
    totalViews: profile.viewCount,
    totalClicks,
    last30Days: {
      profileViews,
      linkClicks,
    },
  };
};

const getLinkAnalytics = async (userId) => {
  const profile = await prisma.profile.findUnique({
    where: { userId },
    include: {
      links: {
        orderBy: { clickCount: 'desc' },
      },
    },
  });

  if (!profile) {
    throw new NotFoundError('Profile not found');
}
return profile.links.map(link => ({
id: link.id,
title: link.title,
url: link.url,
clicks: link.clickCount,
isActive: link.isActive,
}));
};
module.exports = {
getOverview,
getLinkAnalytics,
};