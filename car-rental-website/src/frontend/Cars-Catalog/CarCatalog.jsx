import React from 'react';
import Carousel from './Carousel';
import SearchBar from './SearchBar';
import Box from '@mui/material/Box';

const CarCatalog = () => {
  const imageUrl = '/images/Herosection.jpg'; // Ensure the path is correct

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      width: '100vw',
      position: 'relative', // Ensures the positioning context
    }}>
      {/* Background Image */}
      <img src={imageUrl} alt="Car Rental Service" style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        position: 'absolute', // Fixes the image in the background
        zIndex: -100, // Keeps the image behind other content
        top: 0,
        left: 0
      }} />
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black overlay
        zIndex: -50 // Higher than image, lower than content
      }}></div>
      {/* Search Bar with specific width and spacing */}
      <Box sx={{ width: '50vw', mt: 4, zIndex: 5 }}> {/* Adjust margin-top (mt) for spacing from top */}
        <SearchBar />
      </Box>
      {/* Carousel with specific width and adjusted spacing */}
      <Box sx={{ width: '100vw', mt: 2, zIndex: 5 }}> {/* Additional margin-top (mt) for spacing between components */}
        <Carousel />
      </Box>
    </Box>
  );
};

export default CarCatalog;
