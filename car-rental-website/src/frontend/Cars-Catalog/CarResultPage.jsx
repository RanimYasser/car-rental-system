import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, CardMedia, Button, Typography, CircularProgress, Container } from '@mui/material';
import { Link } from 'react-router-dom'; // For linking to the reserve page or action
import './CarsPage.css';

const CarResultsPage = () => {
  const [cars, setCars] = useState([]); // State to store cars data
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null); // State to track errors

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch('http://localhost/car-rental-website/searchResult.php');
        if (!response.ok) {
          throw new Error('Failed to fetch cars');
        }
        const data = await response.json();
        setCars(data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching car data');
        setLoading(false);
        console.error('Error fetching car data:', error);
      }
    };

    fetchCars();
  }, []);

  // Render loading or error message
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Typography variant="h6" color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100vw', // Full viewport width
        height: '100vh', // Full viewport height
        backgroundImage: 'url("/images/car1.jpg")', // Add your image path here
        backgroundSize: 'cover', // Make the background image cover the whole page
        backgroundPosition: 'center',
        position: 'relative', // To position the overlay on top of the background
        color: '#fff', // White text for contrast
        paddingTop: 4,
      }}
    >
      {/* Semitransparent black overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)', // Black overlay with some transparency
        }}
      />
      
      <Container sx={{ paddingBottom: 6, zIndex: 2, position: 'relative' }}>
        {/* Title Section */}
        <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
          <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#fff' }}>
            Your Search Results
          </Typography>
          <Typography variant="h6" color="textSecondary" sx={{ marginTop: 1, color: '#fff' }}>
            Here are the cars that match your search criteria. Browse through our collection and choose the one that fits your needs.
          </Typography>
        </Box>

        {/* Car Results Section */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', // Adjust card size for different screen sizes
            gap: 3,
            padding: 2,
            minHeight: '45vh',
            color: '#fff', // Light text for contrast
          }}
        >
          {/* Map over the cars data */}
          {cars.length > 0 ? (
            cars.map((car) => (
              <Card
                key={car.plate_id}
                sx={{
                  position: 'relative',
                  boxShadow: 4, // Soft shadow for modern look
                  borderRadius: 2,
                  overflow: 'hidden',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': { 
                    boxShadow: 12, // More intense shadow on hover
                    transform: 'translateY(-10px)', // Elevation effect
                  },
                }}
              >
                {/* Card Media (Image) */}
                <CardMedia
                  component="img"
                  height="200"
                  image={`/images/${car.plate_id}.jpg`} // Image name by plate_id
                  alt={car.brand}
                  sx={{
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.05)', // Slight zoom effect on hover
                    },
                  }}
                />
                {/* Card Content Section */}
                <CardContent sx={{ padding: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#fff' }}>
                    {car.brand} {car.year}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ fontSize: '1rem' }}>
                    ${car.price_per_day} per day
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ fontSize: '0.9rem', marginTop: 1 }}>
                    Color: {car.color}
                  </Typography>
                </CardContent>

                {/* Button Section */}
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: 2,
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <Link to={`/reserve/${car.plate_id}`} style={{ textDecoration: 'none' }}>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{
                        fontWeight: 'bold',
                        backgroundColor: '#1976d2',
                        '&:hover': {
                          backgroundColor: '#115293',
                        },
                        padding: '12px 24px',
                        fontSize: '1rem',
                        borderRadius: 20,
                      }}
                    >
                      Reserve Now
                    </Button>
                  </Link>
                </Box>
              </Card>
            ))
          ) : (
            <Typography variant="h6" color="textSecondary" align="center" sx={{ width: '100%' }}>
              No cars available at the moment.
            </Typography>
          )}
        </Box>

        {/* Additional Content Section (e.g., Filters or Promotions) */}
        <Box sx={{ textAlign: 'center', marginTop: 6 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#fff' }}>
            Special Offers & Promotions
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ marginTop: 2, maxWidth: '600px', margin: '0 auto', color: '#fff' }}>
            Check out our special offers on premium cars! Get 10% off on your first reservation or book for 7 days and get an extra day free!
          </Typography>
        </Box>

        {/* Footer Section */}
        <Box sx={{ textAlign: 'center', marginTop: 6, padding: 2, backgroundColor: '#333', color: 'white' }}>
          <Typography variant="body2">
            © 2024 Car Rental, All Rights Reserved
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default CarResultsPage;
