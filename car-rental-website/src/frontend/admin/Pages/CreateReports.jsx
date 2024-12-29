import { useState } from 'react';
import { Box, TextField, Button, Typography, Card, CardContent, Grid, Radio, RadioGroup, FormControlLabel, FormControl } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../../theme';
import axios from 'axios';

function CreateReports() {
  const backgroundImageUrl = '/images/car1.jpg';
  const [reportType, setReportType] = useState('reservation_report');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [carId, setCarId] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const params = {};

    if (reportType === 'reservation_report') {
      params.start_date = startDate;
      params.end_date = endDate;
    } else if (reportType === 'car_reservation_report') {
      params.car_id = carId;
      params.start_date = startDate;
      params.end_date = endDate;
    } else if (reportType === 'customer_reservations') {
      params.customer_id = customerId;
    }

    try {
      const response = await axios.post(`http://localhost/car-rental-website/advancedSearch.php?action=${reportType}`, params);
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
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
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
          <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
            Advanced Report Generator
          </Typography>
          <Box
            component="form"
            onSubmit={handleSearch}
            sx={{
              backgroundColor: 'rgba(52, 51, 51, 0.7)',
              borderRadius: '30px',
              p: 3,
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
              mb: 4,
            }}
          >
            <FormControl component="fieldset" sx={{ mb: 3 }}>
              <RadioGroup
                row
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
              >
                <FormControlLabel
                  value="reservation_report"
                  control={<Radio />}
                  label="Reservation Report"
                />
                <FormControlLabel
                  value="car_reservation_report"
                  control={<Radio />}
                  label="Car Reservation Report"
                />
                <FormControlLabel
                  value="customer_reservations"
                  control={<Radio />}
                  label="Customer Reservations"
                />
              </RadioGroup>
            </FormControl>

            {(reportType === 'reservation_report' || reportType === 'car_reservation_report') && (
              <>
                <TextField
                  label="Start Date"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  sx={{ mb: 3 }}
                />
                <TextField
                  label="End Date"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  sx={{ mb: 3 }}
                />
              </>
            )}

            {reportType === 'car_reservation_report' && (
              <TextField
                label="Car ID"
                value={carId}
                onChange={(e) => setCarId(e.target.value)}
                fullWidth
                sx={{ mb: 3 }}
              />
            )}

            {reportType === 'customer_reservations' && (
              <TextField
                label="Customer ID"
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
                fullWidth
                sx={{ mb: 3 }}
              />
            )}

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
              Generate Report
            </Button>
          </Box>

          {results.length > 0 && (
            <Grid container spacing={2} sx={{ mt: 4 }}>
              {results.map((result, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Card
                    sx={{
                      backgroundColor: 'rgba(51, 51, 51, 0.7)',
                      borderRadius: '20px',
                      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                      color: 'white',
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        Result {index + 1}
                      </Typography>
                      <Typography variant="body2">{JSON.stringify(result)}</Typography>
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

export default CreateReports;
