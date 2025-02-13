const multer = require('multer');

// Configure multer for memory storage
const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: (req, file, cb) => {
        // Accept images and videos only
        if (!file.mimetype.startsWith('image/') && !file.mimetype.startsWith('video/')) {
            return cb(new Error('Only image and video files are allowed!'), false);
        }
        cb(null, true);
    },
    limits: {
        fileSize: 50 * 1024 * 1024 // 50MB limit
    }
});

module.exports = upload; 