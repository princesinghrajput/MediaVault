import { Box, Button, Chip, Fade, CircularProgress } from '@mui/material';
import { Upload as UploadIcon, CloudUpload as CloudUploadIcon } from '@mui/icons-material';

const UploadSection = ({ 
  selectedFile, 
  setSelectedFile, 
  isUploading, 
  handleFileSelect, 
  handleUpload 
}) => {
  return (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 4, flexWrap: 'wrap' }}>
      <Button
        variant="contained"
        component="label"
        startIcon={<UploadIcon />}
        disabled={isUploading}
        sx={{ height: 48, px: 3 }}
      >
        Select File
        <input
          type="file"
          hidden
          accept="image/*,video/*"
          onChange={handleFileSelect}
          disabled={isUploading}
        />
      </Button>
      
      {selectedFile && (
        <Fade in>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Chip 
              label={selectedFile.name}
              variant="outlined"
              onDelete={() => !isUploading && setSelectedFile(null)}
              disabled={isUploading}
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={handleUpload}
              disabled={isUploading}
              startIcon={isUploading ? <CircularProgress size={20} color="inherit" /> : <CloudUploadIcon />}
            >
              {isUploading ? 'Uploading...' : 'Upload Now'}
            </Button>
          </Box>
        </Fade>
      )}
    </Box>
  );
};

export default UploadSection; 