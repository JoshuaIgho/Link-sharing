const router = require('express').Router();
const linksController = require('../controllers/links.controller');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const { validateLink, validateReorder } = require('../middleware/validator');

router.get('/', auth, linksController.getLinks);
router.post('/', auth, validateLink, linksController.createLink);

// IMPORTANT: Reorder route MUST come BEFORE /:id routes to avoid conflicts
router.put('/reorder', auth, validateReorder, linksController.reorderLinks);

router.put('/:id', auth, validateLink, linksController.updateLink);
router.delete('/:id', auth, linksController.deleteLink);
router.post('/:id/icon', auth, upload.single('icon'), linksController.uploadIcon);
router.put('/:id/toggle', auth, linksController.toggleLink);

module.exports = router;