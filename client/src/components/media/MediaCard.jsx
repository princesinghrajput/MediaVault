import { Card, CardMedia, CardContent, Typography, IconButton, Box, Fade } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';

const MediaCard = ({ file, onDelete }) => {
  return (
    <Fade in>
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ position: 'relative', pt: '56.25%' }}>
          {file.type === 'image' ? (
            <CardMedia
              component="img"
              image={file.url}
              alt={file.filename}
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          ) : (
            <CardMedia
              component="video"
              src={file.url}
              controls
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%'
              }}
            />
          )}
        </Box>
        <CardContent sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          bgcolor: 'background.paper'
        }}>
          <Typography variant="body2" noWrap sx={{ flex: 1 }}>
            {file.filename}
          </Typography>
          <IconButton 
            color="error" 
            onClick={() => onDelete(file._id)}
            size="small"
          >
            <DeleteIcon />
          </IconButton>
        </CardContent>
      </Card>
    </Fade>
  );
};

export default MediaCard; 