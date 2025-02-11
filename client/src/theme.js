import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
      light: '#64b5f6',
      dark: '#1976d2'
    },
    secondary: {
      main: '#ff4081',
      light: '#ff79b0',
      dark: '#c60055'
    },
    background: {
      default: '#f5f5f5'
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }
      }
    }
  }
});

export default theme; 