import React, { useState } from 'react';
import { TextField, Button, Paper, Typography, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from "@mui/material";
import { useNavigate } from 'react-router-dom'; 
import { ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { Box } from '@mui/system';
import theme from '../../theme.js'; 

export default function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost/car-rental-website/auth.php?action=login',
        { email, password, role },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );

      if (response.data.status === 'success') {
        alert(`Welcome, ${response.data.name || 'User'}!`);

        // Navigate based on the selected role
        if (role === 'admin') {
          navigate('/AdminHomePage');
        } else if (role === 'customer') {
          navigate('/HomePage');
        }
      } else {
        setError(response.data.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      console.error('Error during login:', err);
      setError('An error occurred. Please try again later.');
    }
  };

  const imageUrl = '/images/car2.jpg'; 

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          p: 2,
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1,
          }}
        />
        <Paper
          elevation={6}
          sx={{
            p: 4,
            maxWidth: 450,
            width: '100%',
            backdropFilter: 'blur(4px)',
            backgroundColor: 'rgba(55, 53, 53, 0.7)',
            borderRadius: 3,
            zIndex: 2,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              mb: 3,
              textAlign: 'center',
              fontWeight: 'bold',
              color: 'primary.main',
            }}
          >
            SIGN IN
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email or Username"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 3 }}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 3 }}
            />
            <FormControl component="fieldset" fullWidth sx={{ mb: 3 }}>
              <FormLabel component="legend" sx={{ color: 'text.primary', fontWeight: 'bold' }}>
                Role
              </FormLabel>
              <RadioGroup
                row
                value={role}
                onChange={(e) => setRole(e.target.value)}
                sx={{ justifyContent: 'center', mt: 1 }}
              >
                <FormControlLabel value="customer" control={<Radio color="primary" />} label="Customer" />
                <FormControlLabel value="admin" control={<Radio color="primary" />} label="Admin" />
              </RadioGroup>
            </FormControl>
            {error && (
              <Typography color="error" sx={{ mb: 3, textAlign: 'center', fontSize: '0.9rem' }}>
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 'bold',
                textTransform: 'none',
                mb: 3,
              }}
            >
              Sign In
            </Button>
          </form>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}
