const express = require('express');
const router = express.Router();
const mediaController = require('../controllers/mediaController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

// Protected media routes
router.post('/upload', auth, upload.single('file'), mediaController.uploadMedia);
router.get('/', auth, mediaController.getAllMedia);
router.get('/filter/:type', auth, mediaController.filterMediaByType);
router.delete('/:id', auth, mediaController.deleteMedia);

module.exports = router; 