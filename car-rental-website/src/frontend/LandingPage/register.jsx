import React, { useState } from 'react';
import { TextField, Button, Paper, Typography, Box } from '@mui/material';
import axios from 'axios'; 
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../theme';

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: '', // Combined name (first name + last name) -> hattghayar
    email: '',
    phone: '',
    licenseNumber: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
        // Make the POST request to the backend
        const response = await axios.post('http://localhost/car-rental-website/register.php', formData, {
            withCredentials: true,
        });

        // Handle success response
        if (response.data.status === 'success') {
            setSuccess('Registration successful! You can now log in.');
            setError('');
            setFormData({ name: '', email: '', phone: '', licenseNumber: '', password: '' });
        } else {
            // Handle error response (e.g., already exists)
            setError(response.data.message || 'Registration failed. Please try again.');
            setSuccess('');
        }
    } catch (err) {
        console.error('Error during registration:', err);
        setError('An error occurred. Please try again later.');
        setSuccess('');
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
            maxWidth: 400,
            width: '100%',
            backdropFilter: 'blur(4px)',
            backgroundColor: 'rgba(55, 53, 53, 0.7)', 
            borderRadius: 3,
            zIndex: 2,
          }}
        >
          <Typography variant="h5" sx={{ mb: 2 }}>Register</Typography>
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <TextField
                fullWidth
                label="Name (First Name + Last Name)"
                name="name"
                variant="outlined"
                value={formData.name}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                variant="outlined"
                value={formData.email}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                type="tel"
                variant="outlined"
                value={formData.phone}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="License Number"
                name="licenseNumber"
                variant="outlined"
                value={formData.licenseNumber}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                variant="outlined"
                value={formData.password}
                onChange={handleChange}
              />
            </Box>
            {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
            {success && <Typography color="primary" sx={{ mt: 2 }}>{success}</Typography>}
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 4 }}>
              Register
            </Button>
          </form>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2">
              Already have an account?{' '}
              <Button href="/" sx={{ textTransform: 'none', p: 0 }} size="small">Login</Button>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </ThemeProvider> 
  );
}
