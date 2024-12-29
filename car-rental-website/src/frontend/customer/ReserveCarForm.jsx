import React, { useState } from 'react';
import { Box, Typography, TextField, Button, ThemeProvider } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import theme from '../../theme';

const ReserveCarForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const car = location.state?.car || JSON.parse(sessionStorage.getItem('car'));
  const pickupDate = location.state?.pickupDate || sessionStorage.getItem('pickupDate');
  const returnDate = location.state?.returnDate || sessionStorage.getItem('returnDate');
  const pickupLocation = location.state?.pickupLocation || sessionStorage.getItem('pickupLocation');
  const loggedInLicenseNumber = sessionStorage.getItem('license_number'); 
  const [licenseNumber, setLicenseNumber] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const calculateTotalCost = () => {
    const startDate = new Date(pickupDate);
    const endDate = new Date(returnDate);
    const rentalDays = Math.max(1, Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)));
    return rentalDays * (car.price_per_day || 0);
  };

  const handleConfirm = async () => {
    if (licenseNumber !== loggedInLicenseNumber) {
      setError('The entered license number does not match your account.');
      return;
    }

    const totalCost = calculateTotalCost();

    const data = {
      licenseNumber,
      car_id: car.car_id,
      office_id: car.office_id,
      pickupDate,
      returnDate,
      totalCost,
    };

    try {
      const response = await fetch('http://localhost/car-rental-website/reserve_car.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (result.status === 'success') {
        setSuccess('Reservation successfully confirmed!');
        setTimeout(() => {
          navigate('/confirmationPage', {
            state: {
              car,
              licenseNumber,
              pickupDate,
              pickupLocation,
              returnDate,
              totalCost,
              reservationTimestamp: new Date().toISOString(),
            },
          });
        }, 2000);
      } else {
        setError(result.message || 'An error occurred while making the reservation.');
      }
    } catch (err) {
      setError('Network or Backend Error: Unable to complete the reservation.');
      console.error(err);
    }
  };

  const backgroundImage = '/images/car1.jpg';

  if (!car || !pickupDate || !returnDate || !pickupLocation) {
    return (
      <Box sx={{ padding: 4, textAlign: 'center' }}>
        <Typography color="error">
          Missing required information. Please go back and select a car.
        </Typography>
        <Button onClick={() => navigate('/cars')} variant="contained" color="primary">
          Back to Cars
        </Button>
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
          }}
        />
        <Box
          sx={{
            zIndex: 2,
            maxWidth: 600,
            width: '90%',
            padding: 4,
            backgroundColor: 'rgba(29, 28, 28, 0.9)',
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', textAlign: 'center' }}>
            Confirm Your Reservation
          </Typography>

          <Box
            component="img"
            src={`/images/${car.plate_id}.jpg`}
            alt={`${car.brand} ${car.model}`}
            sx={{
              width: '100%',
              maxHeight: 300,
              objectFit: 'cover',
              borderRadius: 2,
              mb: 3,
            }}
          />

          <Typography variant="h6" sx={{ mb: 1 }}>
            {car.brand} {car.model || 'N/A'}
          </Typography>
          <Typography sx={{ mb: 1 }}>Color: {car.color || 'N/A'}</Typography>
          <Typography sx={{ mb: 1 }}>Price per Day: ${car.price_per_day || 'N/A'}</Typography>
          <Typography sx={{ mb: 1 }}>Pickup Date: {pickupDate}</Typography>
          <Typography sx={{ mb: 1 }}>Return Date: {returnDate}</Typography>
          <Typography sx={{ mb: 3 }}>
            Total Cost: <strong>${calculateTotalCost()}</strong>
          </Typography>

          {error && (
            <Typography color="error" sx={{ mb: 3 }}>
              {error}
            </Typography>
          )}
          {success && (
            <Typography sx={{ mb: 3, color: 'green' }}>
              {success}
            </Typography>
          )}

          <TextField
            fullWidth
            label="License Number"
            value={licenseNumber}
            onChange={(e) => setLicenseNumber(e.target.value)}
            sx={{ mb: 3 }}
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleConfirm}
            disabled={!licenseNumber}
          >
            Confirm Reservation
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default ReserveCarForm;
