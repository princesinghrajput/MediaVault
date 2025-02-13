import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Button, 
  Chip, 
  IconButton, 
  Paper, 
  Typography,
  CircularProgress,
  LinearProgress,
  Collapse,
  Fade
} from '@mui/material';
import { 
  CloudUpload as CloudUploadIcon,
  Close as CloseIcon,
  InsertDriveFile as FileIcon,
  AddPhotoAlternate as PhotoIcon,
  VideoCall as VideoIcon
} from '@mui/icons-material';

const UploadSection = ({ 
  selectedFile, 
  setSelectedFile, 
  isUploading, 
  handleFileSelect, 
  handleUpload 
}) => {
  const [showDropzone, setShowDropzone] = useState(false);
  const previewUrl = selectedFile ? URL.createObjectURL(selectedFile) : null;

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  // Close dropzone when upload is complete
  useEffect(() => {
    if (!isUploading && !selectedFile) {
      setShowDropzone(false);
    }
  }, [isUploading, selectedFile]);

  return (
    <Box>
      {/* Main Upload Button */}
      {!showDropzone && !selectedFile && (
        <Fade in>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 3 }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => setShowDropzone(true)}
              startIcon={<PhotoIcon />}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 2,
                boxShadow: 2,
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 3
                },
                transition: 'all 0.2s ease'
              }}
            >
              Upload Image
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => setShowDropzone(true)}
              startIcon={<VideoIcon />}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 2,
                '&:hover': {
                  transform: 'translateY(-2px)'
                },
                transition: 'all 0.2s ease'
              }}
            >
              Upload Video
            </Button>
          </Box>
        </Fade>
      )}

      {/* Dropzone and Preview Area */}
      <Collapse in={showDropzone || !!selectedFile}>
        <Paper 
          elevation={0}
          sx={{ 
            p: 4,
            mb: 3, 
            backgroundColor: '#f8fafc',
            border: '2px dashed',
            borderColor: selectedFile ? 'primary.main' : 'primary.light',
            borderRadius: 3,
            textAlign: 'center',
            position: 'relative',
            transition: 'all 0.2s ease',
            '&:hover': !selectedFile && {
              borderColor: 'primary.main',
              backgroundColor: '#f1f5f9'
            }
          }}
        >
          {/* Close Button for Dropzone */}
          {!selectedFile && (
            <IconButton
              onClick={() => setShowDropzone(false)}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                bgcolor: 'background.paper',
                '&:hover': { bgcolor: '#e0e0e0' }
              }}
            >
              <CloseIcon />
            </IconButton>
          )}

          {!selectedFile ? (
            // Upload Prompt
            <Box
              component="label"
              sx={{ 
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                py: 4
              }}
            >
              <input
                type="file"
                hidden
                accept="image/*,video/*"
                onChange={handleFileSelect}
                disabled={isUploading}
              />
              <CloudUploadIcon 
                sx={{ 
                  fontSize: 64, 
                  color: 'primary.main', 
                  mb: 2,
                  transition: 'transform 0.2s ease',
                  '&:hover': {
                    transform: 'scale(1.1)'
                  }
                }} 
              />
              <Typography variant="h6" color="primary.main" gutterBottom>
                Drag and drop your files here
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                or click to browse
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Supports images and videos up to 50MB
              </Typography>
            </Box>
          ) : (
            // Preview Section
            <Box sx={{ position: 'relative' }}>
              <IconButton
                onClick={() => setSelectedFile(null)}
                sx={{
                  position: 'absolute',
                  right: -16,
                  top: -16,
                  backgroundColor: 'white',
                  boxShadow: 1,
                  '&:hover': { 
                    backgroundColor: '#e0e0e0',
                    transform: 'scale(1.1)'
                  },
                  transition: 'transform 0.2s ease'
                }}
              >
                <CloseIcon />
              </IconButton>

              {/* Preview Container */}
              <Box sx={{ maxWidth: '800px', margin: '0 auto' }}>
                {selectedFile.type.startsWith('image/') ? (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    style={{
                      width: '100%',
                      maxHeight: '400px',
                      objectFit: 'contain',
                      borderRadius: '8px'
                    }}
                  />
                ) : (
                  <video
                    src={previewUrl}
                    controls
                    style={{
                      width: '100%',
                      maxHeight: '400px',
                      borderRadius: '8px',
                      backgroundColor: 'black'
                    }}
                  />
                )}

                {/* File Info & Upload Button */}
                <Box sx={{ 
                  mt: 3,
                  display: 'flex', 
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 2 
                }}>
                  <Chip
                    icon={<FileIcon />}
                    label={selectedFile.name}
                    onDelete={() => setSelectedFile(null)}
                    disabled={isUploading}
                    sx={{ 
                      maxWidth: '300px',
                      '& .MuiChip-label': { 
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }
                    }}
                  />
                  <Button
                    variant="contained"
                    onClick={handleUpload}
                    disabled={isUploading}
                    startIcon={isUploading ? <CircularProgress size={20} /> : <CloudUploadIcon />}
                    sx={{
                      px: 4,
                      py: 1.5,
                      borderRadius: 2,
                      boxShadow: 2,
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: 3
                      },
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {isUploading ? 'Uploading...' : 'Upload Now'}
                  </Button>
                </Box>

                {/* Upload Progress */}
                {isUploading && (
                  <Box sx={{ mt: 2, width: '100%' }}>
                    <LinearProgress 
                      sx={{ 
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: 'primary.light'
                      }} 
                    />
                  </Box>
                )}
              </Box>
            </Box>
          )}
        </Paper>
      </Collapse>
    </Box>
  );
};

export default UploadSection; 