import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import './App.css'
import theme from './theme';
import RegisterForm from './components/auth/RegisterForm.jsx';
import LoginForm from './components/auth/LoginForm.jsx';


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
