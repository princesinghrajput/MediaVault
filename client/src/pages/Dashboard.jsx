import { useState, useEffect } from 'react';
import { 
  Container, 
  Grid, 
  Typography, 
  Button, 
  Box,
  Paper,
  Chip,
  CircularProgress
} from '@mui/material';
import { 
  Upload as UploadIcon,
  PhotoLibrary as PhotoLibraryIcon
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import mediaService from '../services/media.service';
import UploadSection from '../components/media/UploadSection';
import MediaCard from '../components/media/MediaCard';

const Dashboard = () => {
  const [mediaFiles, setMediaFiles] = useState([]);
  const [mediaType, setMediaType] = useState('all');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [limit] = useState(9);

  useEffect(() => {
    loadMedia(1);
  }, [mediaType]);

  const loadMedia = async (currentPage) => {
    if (isLoading || (!hasMore && currentPage > 1)) return;

    setIsLoading(true);
    try {
      const response = mediaType === 'all'
        ? await mediaService.getAllMedia(currentPage, limit)
        : await mediaService.filterMediaByType(mediaType, currentPage, limit);

      const { media, hasMore: moreAvailable } = response;
      setMediaFiles(prev => currentPage === 1 ? media : [...prev, ...media]);
      setHasMore(moreAvailable);
    } catch (error) {
      toast.error('Error loading media files');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error('Please select a file first');
      return;
    }

    setIsUploading(true);
    try {
      await mediaService.uploadMedia(selectedFile);
      toast.success('File uploaded successfully');
      setSelectedFile(null);
      loadMedia(1);
    } catch (error) {
      toast.error('Error uploading file');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await mediaService.deleteMedia(id);
      toast.success('File deleted successfully');
      loadMedia(1);
    } catch (error) {
      toast.error('Error deleting file');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: '#1a237e' }}>
          Media Gallery
        </Typography>
        
        <UploadSection 
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
          isUploading={isUploading}
          handleFileSelect={handleFileSelect}
          handleUpload={handleUpload}
        />

        <Box sx={{ mb: 4, display: 'flex', gap: 1 }}>
          {['all', 'image', 'video'].map((type) => (
            <Chip
              key={type}
              label={type.charAt(0).toUpperCase() + type.slice(1)}
              onClick={() => setMediaType(type)}
              color={mediaType === type ? 'primary' : 'default'}
              variant={mediaType === type ? 'filled' : 'outlined'}
              sx={{ px: 1 }}
            />
          ))}
        </Box>

        <Grid container spacing={3}>
          {mediaFiles.map((file) => (
            <Grid item xs={12} sm={6} md={4} key={file._id}>
              <MediaCard file={file} onDelete={handleDelete} />
            </Grid>
          ))}
        </Grid>

        {hasMore && mediaFiles.length > 0 && (
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="outlined"
              onClick={() => setPage(prev => prev + 1)}
              disabled={isLoading}
              startIcon={isLoading && <CircularProgress size={20} />}
            >
              {isLoading ? 'Loading...' : 'Load More'}
            </Button>
          </Box>
        )}

        {mediaFiles.length === 0 && !isLoading && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <PhotoLibraryIcon sx={{ fontSize: 64, color: 'grey.300', mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              No media files yet
            </Typography>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default Dashboard; 