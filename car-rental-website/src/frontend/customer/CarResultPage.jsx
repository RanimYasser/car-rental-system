import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Button,
  Typography,
  CircularProgress,
  Container,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid,
} from '@mui/material';
import backgroundImage from '/images/car1.jpg';

const CarResultsPage = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [brandFilter, setBrandFilter] = useState('');
  const [colorFilter, setColorFilter] = useState('');
  const [modelFilter, setModelFilter] = useState('');

  const navigate = useNavigate();
  const pickupDate = sessionStorage.getItem('pickupDate');
  const returnDate = sessionStorage.getItem('returnDate');
  const pickupLocation = sessionStorage.getItem('pickupLocation');

  const handleReserve = (car) => {
    sessionStorage.setItem('car', JSON.stringify(car));
    navigate('/car reservation', {
      state: { car, pickupDate, returnDate, pickupLocation },
    });
  };

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch('http://localhost/car-rental-website/searchResult.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pickupDate, returnDate, pickupLocation }),
        });
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Error Response:', errorText);
          throw new Error('Failed to fetch cars');
        }
        const data = await response.json();
        setCars(data);
        setFilteredCars(data);
      } catch (err) {
        setError(`Error fetching car data: ${err.message}`);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, [pickupDate, returnDate, pickupLocation]);

  useEffect(() => {
    const applyFilters = () => {
      const filtered = cars.filter(
        (car) =>
          (brandFilter === '' || car.brand === brandFilter) &&
          (colorFilter === '' || car.color === colorFilter) &&
          (modelFilter === '' || car.year.toString() === modelFilter)
      );
      setFilteredCars(filtered);
    };
    applyFilters();
  }, [brandFilter, colorFilter, modelFilter, cars]);

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
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#fff',
        overflow: 'hidden',
      }}
    >
      <Container
        sx={{
          height: '100vh',
          overflowY: 'scroll',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
          zIndex: 2,
          position: 'relative',
          paddingTop: 4,
          paddingBottom: 4,
        }}
      >
        <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
          <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#fff' }}>
            Your Search Results
          </Typography>
        </Box>

        {/* Filters Section */}
        <Box
          sx={{
            marginBottom: 4,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            padding: 2,
            borderRadius: 2,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel sx={{ color: '#fff' }}>Brand</InputLabel>
                <Select
                  value={brandFilter}
                  onChange={(e) => setBrandFilter(e.target.value)}
                  sx={{
                    backgroundColor: '#333',
                    color: '#fff',
                    '& .MuiSelect-icon': { color: '#fff' },
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#fff' },
                    borderRadius: 1,
                  }}
                >
                  <MenuItem value="">
                    <em>All</em>
                  </MenuItem>
                  {Array.from(new Set(cars.map((car) => car.brand))).map((brand) => (
                    <MenuItem key={brand} value={brand}>
                      {brand}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel sx={{ color: '#fff' }}>Color</InputLabel>
                <Select
                  value={colorFilter}
                  onChange={(e) => setColorFilter(e.target.value)}
                  sx={{
                    backgroundColor: '#333',
                    color: '#fff',
                    '& .MuiSelect-icon': { color: '#fff' },
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#fff' },
                    borderRadius: 1,
                  }}
                >
                  <MenuItem value="">
                    <em>All</em>
                  </MenuItem>
                  {Array.from(new Set(cars.map((car) => car.color))).map((color) => (
                    <MenuItem key={color} value={color}>
                      {color}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel sx={{ color: '#fff' }}>Model</InputLabel>
                <Select
                  value={modelFilter}
                  onChange={(e) => setModelFilter(e.target.value)}
                  sx={{
                    backgroundColor: '#333',
                    color: '#fff',
                    '& .MuiSelect-icon': { color: '#fff' },
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#fff' },
                    borderRadius: 1,
                  }}
                >
                  <MenuItem value="">
                    <em>All</em>
                  </MenuItem>
                  {Array.from(new Set(cars.map((car) => car.year))).map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>

        {/* Cars Section */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 3,
            padding: 2,
          }}
        >
          {filteredCars.map((car) => (
            <Card
              key={car.car_id}
              sx={{
                position: 'relative',
                boxShadow: 4,
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                borderRadius: 2,
                overflow: 'hidden',
                '&:hover': { boxShadow: 12 },
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={`/images/${car.plate_id}.jpg`}
                alt={`${car.brand} ${car.year}`}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ padding: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#fff' }}>
                  {car.brand} {car.year}
                </Typography>
                <Typography variant="body2" sx={{ color: '#9E9EA2' }}>
                  ${car.price_per_day} per day
                </Typography>
                <Typography variant="body2" sx={{ marginTop: 1, color: '#9E9EA2' }}>
                  Color: {car.color}
                </Typography>
              </CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
                <Button variant="contained" color="primary" onClick={() => handleReserve(car)}>
                  Reserve Now
                </Button>
              </Box>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default CarResultsPage;
