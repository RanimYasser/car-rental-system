import React, { useState } from 'react';
import { TextField, Button, Paper, Typography, Box } from '@mui/material';
import axios from 'axios'; // For backend communication
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../../theme'; 

export default function AddCarForm() {
  const [formData, setFormData] = useState({
    plate_id: '', 
    model: '',
    year: '',
    brand: '',
    price_per_day: '',
    color: '',
    office_id: '',
    status: '',
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
        console.log('Data to be sent:', formData);
        const response = await axios.post(
          'http://localhost/car-rental-website/CarRegistration.php',
          formData, // Plain object
          {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          }
        );
        // Handle success response
        if (response.data.status === 'success') {
            setSuccess('Car Registered successfully!');
            setError('');
            setFormData({ plate_id: '', model: '', year: '', brand: '', price_per_day: '',color: '',office_id:'',status:'' });
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
  const imageUrl = '/images/car2.jpg'; // Path to the background image
  return (
    <ThemeProvider theme={theme}> {/* Wrap with ThemeProvider to apply the custom theme */}
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
          <Typography variant="h5" sx={{ mb: 2 }}>Car Register</Typography>
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                fullWidth
                label="Car plate"
                name="plate_id"
                variant="outlined"
                value={formData.plate_id}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="Model"
                name="model"
                variant="outlined"
                value={formData.model}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="Year"
                name="year"
                type="int"
                variant="outlined"
                value={formData.year}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="Brand"
                name="brand"
                variant="outlined"
                value={formData.brand}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="Price per Day"
                name="price_per_day"
                variant="outlined"
                value={formData.price_per_day}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="Color"
                name="color"
                variant="outlined"
                value={formData.color}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="Office ID"
                name="office_id"
                //type="password"
                variant="outlined"
                value={formData.office_id}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="Status"
                name="status"
                variant="outlined"
                value={formData.status}
                onChange={handleChange}
              />
            </Box>
            {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
            {success && <Typography color="primary" sx={{ mt: 2 }}>{success}</Typography>}
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 4 }}>
              Register
            </Button>
          </form>
        </Paper>
      </Box>
    </ThemeProvider> 
  );
}