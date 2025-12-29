const prisma = require('../config/database');
const { uploadImage, deleteImage, extractPublicId } = require('./upload.service');
const { NotFoundError, ForbiddenError } = require('../utils/errors');

const getLinks = async (userId) => {
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

  return profile.links;
};

const createLink = async (userId, data) => {
  const { title, url, description } = data;

  const profile = await prisma.profile.findUnique({
    where: { userId },
    include: { links: true },
  });

  if (!profile) {
    throw new NotFoundError('Profile not found');
  }

  // Get next position
  const maxPosition = profile.links.length > 0
    ? Math.max(...profile.links.map(l => l.position))
    : -1;

  const link = await prisma.link.create({
    data: {
      profileId: profile.id,
      title,
      url,
      description,
      position: maxPosition + 1,
    },
  });

  return link;
};

const updateLink = async (userId, linkId, data) => {
  const { title, url, description, isActive } = data;

  // Verify ownership
  const link = await prisma.link.findUnique({
    where: { id: linkId },
    include: { profile: true },
  });

  if (!link) {
    throw new NotFoundError('Link not found');
  }

  if (link.profile.userId !== userId) {
    throw new ForbiddenError('Not authorized to update this link');
  }

  const updatedLink = await prisma.link.update({
    where: { id: linkId },
    data: {
      ...(title && { title }),
      ...(url && { url }),
      ...(description !== undefined && { description }),
      ...(isActive !== undefined && { isActive }),
    },
  });

  return updatedLink;
};

const deleteLink = async (userId, linkId) => {
  // Verify ownership
  const link = await prisma.link.findUnique({
    where: { id: linkId },
    include: { profile: true },
  });

  if (!link) {
    throw new NotFoundError('Link not found');
  }

  if (link.profile.userId !== userId) {
    throw new ForbiddenError('Not authorized to delete this link');
  }

  // Delete icon from Cloudinary if exists
  if (link.iconUrl) {
    const publicId = extractPublicId(link.iconUrl);
    if (publicId) {
      try {
        await deleteImage(publicId);
      } catch (error) {
        console.error('Failed to delete link icon:', error);
      }
    }
  }

  // Delete link
  await prisma.link.delete({
    where: { id: linkId },
  });

  // Reorder remaining links
  await prisma.link.updateMany({
    where: {
      profileId: link.profileId,
      position: { gt: link.position },
    },
    data: {
      position: { decrement: 1 },
    },
  });

  return { message: 'Link deleted successfully' };
};

const uploadLinkIcon = async (userId, linkId, file) => {
  // Verify ownership
  const link = await prisma.link.findUnique({
    where: { id: linkId },
    include: { profile: true },
  });

  if (!link) {
    throw new NotFoundError('Link not found');
  }

  if (link.profile.userId !== userId) {
    throw new ForbiddenError('Not authorized to update this link');
  }

  // Delete old icon if exists
  if (link.iconUrl) {
    const publicId = extractPublicId(link.iconUrl);
    if (publicId) {
      try {
        await deleteImage(publicId);
      } catch (error) {
        console.error('Failed to delete old icon:', error);
      }
    }
  }

  // Upload new icon
  const result = await uploadImage(file.buffer, {
    folder: 'linkshare/link-icons',
    transformation: [
      { width: 100, height: 100, crop: 'fill' },
      { quality: 'auto', fetch_format: 'auto' },
    ],
  });

  // Update link
  const updatedLink = await prisma.link.update({
    where: { id: linkId },
    data: { iconUrl: result.secure_url },
  });

  return updatedLink;
};

const reorderLinks = async (userId, linkId, newPosition) => {
  const profile = await prisma.profile.findUnique({
    where: { userId },
    include: { links: { orderBy: { position: 'asc' } } },
  });

  if (!profile) {
    throw new NotFoundError('Profile not found');
  }

  const link = profile.links.find(l => l.id === linkId);
  if (!link) {
    throw new NotFoundError('Link not found');
  }

  const oldPosition = link.position;

  if (oldPosition === newPosition) {
    return profile.links;
  }

  // Update positions in transaction
  await prisma.$transaction(async (tx) => {
    if (newPosition > oldPosition) {
      // Moving down
      await tx.link.updateMany({
        where: {
          profileId: profile.id,
          position: { gt: oldPosition, lte: newPosition },
        },
        data: { position: { decrement: 1 } },
      });
    } else {
      // Moving up
      await tx.link.updateMany({
        where: {
          profileId: profile.id,
          position: { gte: newPosition, lt: oldPosition },
        },
        data: { position: { increment: 1 } },
      });
    }

    await tx.link.update({
      where: { id: linkId },
      data: { position: newPosition },
    });
  });

  return await getLinks(userId);
};

const toggleLink = async (userId, linkId) => {
  const link = await prisma.link.findUnique({
    where: { id: linkId },
    include: { profile: true },
  });

  if (!link) {
    throw new NotFoundError('Link not found');
  }

  if (link.profile.userId !== userId) {
    throw new ForbiddenError('Not authorized to update this link');
  }

  const updatedLink = await prisma.link.update({
    where: { id: linkId },
    data: { isActive: !link.isActive },
  });

  return updatedLink;
};

module.exports = {
  getLinks,
  createLink,
  updateLink,
  deleteLink,
  uploadLinkIcon,
  reorderLinks,
  toggleLink,
};