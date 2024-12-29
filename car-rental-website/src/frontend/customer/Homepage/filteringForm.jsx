import React, { useState } from 'react';
import { Box, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem, ThemeProvider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import theme from '../../../theme';

export default function FilteringForm() {
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const imageUrl = '/images/car1.jpg';

  const validateForm = () => {
    if (!pickupDate || !returnDate || !pickupLocation) {
      setError('All fields are required');
      return false;
    }
    if (new Date(pickupDate) > new Date(returnDate)) {
      setError('Return date must be after pickup date');
      return false;
    }
    setError('');
    return true;
  };

  const handleSearch = () => {
    if (!validateForm()) return;

    // Store form data in sessionStorage
    sessionStorage.setItem('pickupDate', pickupDate);
    sessionStorage.setItem('returnDate', returnDate);
    sessionStorage.setItem('pickupLocation', pickupLocation);
    sessionStorage.setItem('pickupLocation', pickupLocation);

    // Navigate to the cars page
    navigate('/cars');
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          minHeight: '100vh',
          width: '100vw',
        }}
      >
        {/* Left Section - Wallpaper Image */}
        <Box
          sx={{
            flex: 2,
            backgroundImage: `url(${imageUrl})`, 
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
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
            }}
          />
        </Box>

        {/* Right Section - Form */}
        <Box
          sx={{
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            padding: 4,
            borderRadius: 2,
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            justifyContent: 'center',
            alignItems: 'center',
            maxWidth: 700,
            marginLeft: 'auto',
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 'bold', textAlign: 'left' }}>
            Rent Your Car
          </Typography>

          {error && (
            <Typography sx={{ color: 'red', textAlign: 'center', mb: 2 }}>
              {error}
            </Typography>
          )}

          <Typography variant="h6" sx={{ textAlign: 'left' }}>
            Pick-up Date
          </Typography>
          <TextField
            type="date"
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
            sx={{
              backgroundColor: 'white',
              borderRadius: 1,
              mb: 2,
              maxWidth: 350,
              width: '100%',
            }}
          />

          <Typography variant="h6" sx={{ textAlign: 'left' }}>
            Return Date
          </Typography>
          <TextField
            type="date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            sx={{
              backgroundColor: 'white',
              borderRadius: 1,
              mb: 2,
              maxWidth: 350,
              width: '100%',
            }}
          />

          <Typography variant="h6" sx={{ textAlign: 'left' }}>
            Pickup Location
          </Typography>
          <FormControl fullWidth sx={{ mb: 2, maxWidth: 350 }}>
            <InputLabel>Select location</InputLabel>
            <Select
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              sx={{ backgroundColor: 'white', borderRadius: 1 }}
            >
              <MenuItem value="Cairo">Cairo</MenuItem>
              <MenuItem value="Alexandria">Alexandria</MenuItem>
              <MenuItem value="Giza">Giza</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            sx={{
              mt: 2,
              fontWeight: 'bold',
              padding: '8px 16px',
              maxWidth: 500,
            }}
          >
            SEARCH
          </Button>
          
        </Box>
      </Box>
    </ThemeProvider>
  );
}
