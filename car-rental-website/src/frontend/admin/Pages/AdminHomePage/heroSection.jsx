import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Card, CardContent, Grid } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../../../theme';
import axios from 'axios';

function HeroSection() {
  const backgroundImageUrl = '/images/car1.jpg'; 
  const [carInfo, setCarInfo] = useState('');
  const [customerInfo, setCustomerInfo] = useState('');
  const [reservationDate, setReservationDate] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost/car-rental-website/advancedSearch.php', {
        carInfo,
        customerInfo,
        reservationDate,
      });
      console.log('Search Results:', response.data);
      setResults(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error('Error during search:', err);
      setResults([]);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '100vh',
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'auto',
          py: 4,
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

        <Box
          sx={{
            position: 'relative',
            zIndex: 2,
            textAlign: 'center',
            color: '#fff',
            px: 3,
            width: '50vw',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              mb: 3,
              fontWeight: 'bold',
            }}
          >
            Advanced Search
          </Typography>

          <Box
            component="form"
            onSubmit={handleSearch}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(52, 51, 51, 0.7)',
              borderRadius: '30px',
              p: 3,
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
              mb: 4,
            }}
          >
            <TextField
              placeholder="Search by Car Information..."
              value={carInfo}
              onChange={(e) => setCarInfo(e.target.value)}
              variant="outlined"
              fullWidth
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '30px',
                },
              }}
            />
            <TextField
              placeholder="Search by Customer Information..."
              value={customerInfo}
              onChange={(e) => setCustomerInfo(e.target.value)}
              variant="outlined"
              fullWidth
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '30px',
                },
              }}
            />
            <TextField
              placeholder="Search by Reservation Date..."
              value={reservationDate}
              onChange={(e) => setReservationDate(e.target.value)}
              variant="outlined"
              fullWidth
              type="date"
              InputLabelProps={{ shrink: true }}
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '30px',
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                px: 4,
                borderRadius: '30px',
                textTransform: 'none',
              }}
            >
              Search
            </Button>
          </Box>

          {results.length > 0 && (
  <Grid
    container
    spacing={2}
    sx={{
      mt: 4,
      width: '50vw',
      mx: 'auto',
    }}
  >
    {results.map((result, index) => (
      <Grid item xs={12} sm={6} key={index}>
        <Card
          sx={{
            backgroundColor: 'rgba(51, 51, 51, 0.7)',
            borderRadius: '20px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
            color:'white',
          }}
        >
          <CardContent>
            {result.car_id && (
              <>
              
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Car: {result.model}
                </Typography>
                <Typography variant="body2">Brand: {result.brand}</Typography>
                <Typography variant="body2">Plate ID: {result.plate_id}</Typography>
                <Typography variant="body2">Color: {result.color}</Typography>
                <Typography variant="body2">Price/Day: {result.price_per_day}</Typography>
              </>
            )}
            {result.license_number && (
              <>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Customer: {result.name}
                </Typography>
                <Typography variant="body2">Phone: {result.phone}</Typography>
                <Typography variant="body2">Email: {result.email}</Typography>
                <Typography variant="body2">License Number: {result.license_number}</Typography>
              </>
            )}
            {result.reservation_id && (
              <>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Reservation ID: {result.reservation_id}
                </Typography>
                <Typography variant="body2">Car Model: {result.car_model}</Typography>
                <Typography variant="body2">Customer: {result.customer_name}</Typography>
                <Typography variant="body2">Pickup Date: {result.pickup_date}</Typography>
                <Typography variant="body2">Return Date: {result.return_date}</Typography>
                <Typography variant="body2">Payment: {result.payment_amount}</Typography>
              </>
            )}
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
)}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default HeroSection;
