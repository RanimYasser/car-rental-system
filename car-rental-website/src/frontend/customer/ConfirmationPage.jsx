import React from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const ConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { car, licenseNumber, pickupDate,pickupLocation, returnDate, totalCost, reservationTimestamp } = location.state || {};

  if (!car || !licenseNumber || !pickupDate || !pickupLocation || !returnDate || !totalCost || !reservationTimestamp) {
    return (
      <Box sx={{ textAlign: 'center', padding: 4 }}>
        <Typography color="error">Reservation details are missing. Please go back and complete the reservation.</Typography>
        <Button onClick={() => navigate('/')} variant="contained" color="primary">
          Back to Home
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        padding: 2,
        color: 'white',
      }}
    >
      <Paper
        elevation={6}
        sx={{
          maxWidth: 800,
          width: '100%',
          padding: 4,
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          color: 'white',
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 'bold', mb: 3 }}>
          Reservation Confirmed
        </Typography>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
            Reservation date:
          </Typography>
          <Typography>{new Date(reservationTimestamp).toLocaleString()}</Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
            Customer Details:
          </Typography>
          <Typography>License Number: {licenseNumber}</Typography>
          <Typography>Pickup Date: {pickupDate}</Typography>
          <Typography>Return Date: {returnDate}</Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
            Car Details:
          </Typography>
          <Typography>{car.brand} {car.model}</Typography>
          <Typography>Color: {car.color}</Typography>
          <Typography>Price per Day: ${car.price_per_day}</Typography>
          <Typography>Total Cost: ${totalCost}</Typography>
        </Box>

        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <img
            src={`/images/${car.plate_id}.jpg`}
            alt={`${car.brand} ${car.model}`}
            style={{
              maxWidth: '100%',
              borderRadius: '10px',
              border: '2px solid white',
              height: 'auto',
            }}
          />
        </Box>

        <Box sx={{ textAlign: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/')}
            sx={{
              fontWeight: 'bold',
              fontSize: '1rem',
              padding: '10px 20px',
            }}
          >
            Back to Home
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default ConfirmationPage;
