import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import './App.css'
import RegisterForm from './components/auth/RegisterForm.jsx';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },  
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/register" element={<RegisterForm />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
