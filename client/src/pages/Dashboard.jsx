import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
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
import { checkAuth } from '../utils/auth';

const Dashboard = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);
  
  const [mediaFiles, setMediaFiles] = useState([]);
  const [mediaType, setMediaType] = useState('all');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [limit] = useState(9);

  // Check authentication on mount and redirect if not authenticated
  useEffect(() => {
    const { isAuthenticated: isAuth } = checkAuth();
    if (!isAuth) {
      navigate('/login');
    }
  }, [navigate]);

  // Load media files
  const loadMedia = async (currentPage = 1, reset = false) => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const response = mediaType === 'all'
        ? await mediaService.getAllMedia(currentPage)
        : await mediaService.filterMediaByType(mediaType, currentPage);

      setMediaFiles(prev => reset ? response.media : [...prev, ...response.media]);
      setHasMore(response.hasMore);
    } catch (error) {
      toast.error('Error loading media files');
    } finally {
      setIsLoading(false);
    }
  };

  // Initial load and type change
  useEffect(() => {
    setPage(1);
    loadMedia(1, true);
  }, [mediaType]);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 50 * 1024 * 1024) {
        toast.error('File size should not exceed 50MB');
        return;
      }
      setSelectedFile(file);
    }
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
      loadMedia(1, true);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error uploading file');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await mediaService.deleteMedia(id);
      toast.success('File deleted successfully');
      loadMedia(1, true);
    } catch (error) {
      toast.error('Error deleting file');
    }
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadMedia(nextPage);
  };

  if (!isAuthenticated) {
    return null;
  }

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

        {isLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {!isLoading && mediaFiles.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <PhotoLibraryIcon sx={{ fontSize: 64, color: 'grey.300', mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              No media files yet
            </Typography>
          </Box>
        )}

        {hasMore && mediaFiles.length > 0 && !isLoading && (
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <Chip
              label="Load More"
              onClick={loadMore}
              clickable
              color="primary"
              variant="outlined"
            />
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default Dashboard; 