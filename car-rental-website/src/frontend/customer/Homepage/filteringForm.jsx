import React, { useState } from 'react';
import { Box, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem, ThemeProvider } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import theme from '../../../theme'; // Assuming you have your custom theme file

export default function FilteringForm() {
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [returnLocation, setReturnLocation] = useState('');

  const handleSearch = async () => {
    const data = {
      pickupDate,
      returnDate,
      pickupLocation,
      returnLocation,
    };

    // Send data to PHP backend
    try {
      const response = await fetch('test_connection.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log(result); // Handle the response from PHP
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const imageUrl = '/images/car1.jpg'; 

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          minHeight: '100vh',
          width: '100vw',
        }}
      >
        {/* Left Section - Background Image */}
        <Box
          sx={{
            flex: 2, // Make the image section take more space
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
            width: '100vw',
          }}
        />
        
        {/* Right Section - Form */}
        <Box
          sx={{
            flex: 1, 
            backgroundColor: 'rgba(0, 0, 0, 0.9)', // Semi-transparent overlay
            padding: 4,
            borderRadius: 2,
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            justifyContent: 'center', // Center the form vertically
            zIndex: 1,
            alignItems: 'center', // Center content horizontally
            maxWidth: 700, // Control the max width of the form
            marginLeft: 'auto', // Align form to the right of the screen
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 'bold', textAlign: 'left' }}>
            Rent Your Car
          </Typography>

          <Typography variant="h6" sx={{ textAlign: 'left' }}>Pick-up Date</Typography>
          <TextField
            type="date"
            variant="outlined"
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{
              backgroundColor: 'white',
              borderRadius: 1,
              mb: 2,
              maxWidth: 350,
              width: '100%', 
            }}
          />

          <Typography variant="h6" sx={{ textAlign: 'left' }}>Return Date</Typography>
          <TextField
            type="date"
            variant="outlined"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{
              backgroundColor: 'white',
              borderRadius: 1,
              mb: 2,
              maxWidth: 350, // Narrower width
              width: '100%', // Ensure it stretches to fit the container
            }}
          />

          <Typography variant="h6" sx={{ textAlign: 'left' }}>Pick-up Location</Typography>
          <FormControl fullWidth sx={{ mb: 2, maxWidth: 350 }}>
            <InputLabel>Select location</InputLabel>
            <Select
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              sx={{ backgroundColor: 'white', borderRadius: 1 }}
            >
              <MenuItem value="Office Germasogia">Office Germasogia</MenuItem>
              <MenuItem value="Office Limassol">Office Limassol</MenuItem>
            </Select>
          </FormControl>

          <Typography variant="h6" sx={{ textAlign: 'left' }}>Return Location</Typography>
          <FormControl fullWidth sx={{ mb: 2, maxWidth: 350 }}>
            <InputLabel>Select location</InputLabel>
            <Select
              value={returnLocation}
              onChange={(e) => setReturnLocation(e.target.value)}
              sx={{ backgroundColor: 'white', borderRadius: 1 }}
            >
              <MenuItem value="Office Germasogia">Office Germasogia</MenuItem>
              <MenuItem value="Office Limassol">Office Limassol</MenuItem>
            </Select>
          </FormControl>

          {/* Link wrapping the Button to navigate to '/cars' */}
          <Link to="/cars" style={{ textDecoration: 'none' }}>
            <Button
              variant="contained"
              color="primary" // Use theme primary color for the button
              onClick={handleSearch}
              fullWidth
              sx={{
              
                mt: 2,
                fontWeight: 'bold',
                fontSize: '0.875rem', // Smaller font size for the button
                backgroundColor: theme.palette.primary.main, // Custom theme color
                padding: '8px 16px', // Reduced padding for smaller button
                '&:hover': {
                  backgroundColor: theme.palette.primary.dark, // Darker hover effect
                },
                maxWidth: 500, // Limit the button width for a smaller appearance
              }}
            >
              SEARCH
            </Button>
          </Link>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
