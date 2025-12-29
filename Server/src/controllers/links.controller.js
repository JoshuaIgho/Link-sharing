const linksService = require('../services/links.service');

const getLinks = async (req, res, next) => {
  try {
    console.log('🔗 Get links for user:', req.userId);
    const links = await linksService.getLinks(req.userId);
    res.json({ success: true, data: links });
  } catch (error) {
    next(error);
  }
};

const createLink = async (req, res, next) => {
  try {
    console.log('➕ Create link for user:', req.userId, req.body);
    const link = await linksService.createLink(req.userId, req.body);
    res.status(201).json({ success: true, data: link });
  } catch (error) {
    next(error);
  }
};

const updateLink = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log('✏️ Update link:', id, 'for user:', req.userId);
    const link = await linksService.updateLink(req.userId, id, req.body);
    res.json({ success: true, data: link });
  } catch (error) {
    next(error);
  }
};

const deleteLink = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log('🗑️ Delete link:', id, 'for user:', req.userId);
    const result = await linksService.deleteLink(req.userId, id);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

const uploadIcon = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }
    const { id } = req.params;
    console.log('📤 Upload icon for link:', id);
    const link = await linksService.uploadLinkIcon(req.userId, id, req.file);
    res.json({ success: true, data: link });
  } catch (error) {
    next(error);
  }
};

const reorderLinks = async (req, res, next) => {
  try {
    console.log('🔀 Reorder links for user:', req.userId);
    console.log('📦 Request body:', req.body);
    
    const { linkId, newPosition } = req.body;
    
    if (!linkId) {
      return res.status(400).json({ success: false, message: 'Link ID is required' });
    }
    
    if (typeof newPosition !== 'number' || newPosition < 0) {
      return res.status(400).json({ success: false, message: 'Valid position is required' });
    }
    
    const links = await linksService.reorderLinks(req.userId, linkId, newPosition);
    console.log('✅ Reorder successful');
    res.json({ success: true, data: links });
  } catch (error) {
    console.error('❌ Reorder error:', error);
    next(error);
  }
};

const toggleLink = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log('👁️ Toggle link:', id, 'for user:', req.userId);
    const link = await linksService.toggleLink(req.userId, id);
    res.json({ success: true, data: link });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getLinks,
  createLink,
  updateLink,
  deleteLink,
  uploadIcon,
  reorderLinks,
  toggleLink,
};