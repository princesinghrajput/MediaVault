import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
} from '@mui/material';
import ProfileMenu from './ProfileMenu';

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, currentUser } = useSelector((state) => state.user);

  return (
    <AppBar 
      position="static" 
      elevation={0} 
      sx={{ 
        bgcolor: 'white',
        borderBottom: '1px solid',
        borderColor: 'divider'
      }}
    >
      <Container maxWidth="lg">
        <Toolbar 
          disableGutters 
          sx={{ 
            minHeight: 64,
            justifyContent: 'space-between'
          }}
        >
          <Typography
            variant="h6"
            sx={{ 
              color: 'primary.main', 
              fontWeight: 700, 
              fontSize: '1.5rem',
              cursor: 'pointer'
            }}
            onClick={() => navigate('/')}
          >
            MediaVault
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            {isAuthenticated ? (
              <ProfileMenu user={currentUser} />
            ) : (
              <>
                <Button 
                  color="primary" 
                  onClick={() => navigate('/login')}
                >
                  Login
                </Button>
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={() => navigate('/register')}
                >
                  Register
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
