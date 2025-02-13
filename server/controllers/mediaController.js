const { S3Client, PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const Media = require('../models/Media');
require('dotenv').config();

// Configure S3 Client
const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
});

const mediaController = {
    // Upload media
    uploadMedia: async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({ 
                    success: false, 
                    message: 'No file uploaded' 
                });
            }

            const key = `${Date.now()}-${req.file.originalname}`;
            
            const putObjectCommand = new PutObjectCommand({
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: key,
                Body: req.file.buffer,
                ContentType: req.file.mimetype,
                ACL: 'public-read'
            });

            await s3Client.send(putObjectCommand);

            // Construct the URL
            const url = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

            const newMedia = new Media({
                filename: req.file.originalname,
                url: url,
                type: req.file.mimetype.startsWith('image/') ? 'image' : 'video',
                user: req.user.userId
            });

            await newMedia.save();

            res.status(201).json({
                success: true,
                media: newMedia
            });
        } catch (error) {
            console.error('Upload error:', error);
            res.status(500).json({
                success: false,
                message: 'Error uploading file',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    },

    // Get all media with pagination
    getAllMedia: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 9;
            const skip = (page - 1) * limit;

            const [media, total] = await Promise.all([
                Media.find({ user: req.user.userId })
                    .sort({ createdAt: -1 })
                    .skip(skip)
                    .limit(limit),
                Media.countDocuments({ user: req.user.userId })
            ]);

            res.json({
                success: true,
                media,
                hasMore: total > skip + media.length,
                total
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error fetching media'
            });
        }
    },

    // Filter media by type
    filterMediaByType: async (req, res) => {
        try {
            const { type } = req.params;
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 9;
            const skip = (page - 1) * limit;

            const [media, total] = await Promise.all([
                Media.find({ 
                    user: req.user.userId,
                    type 
                })
                    .sort({ createdAt: -1 })
                    .skip(skip)
                    .limit(limit),
                Media.countDocuments({ 
                    user: req.user.userId,
                    type 
                })
            ]);

            res.json({
                success: true,
                media,
                hasMore: total > skip + media.length,
                total
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error filtering media'
            });
        }
    },

    // Delete media
    deleteMedia: async (req, res) => {
        try {
            const media = await Media.findOne({
                _id: req.params.id,
                user: req.user.userId
            });
            
            if (!media) {
                return res.status(404).json({
                    success: false,
                    message: 'Media not found'
                });
            }

            // Extract key from URL
            const key = media.url.split('/').pop();
            
            const deleteCommand = new DeleteObjectCommand({
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: key
            });

            await s3Client.send(deleteCommand);
            await media.deleteOne();

            res.json({
                success: true,
                message: 'Media deleted successfully'
            });
        } catch (error) {
            console.error('Delete error:', error);
            res.status(500).json({
                success: false,
                message: 'Error deleting media',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    }
};

module.exports = mediaController; 