import { createTheme } from '@mui/material/styles';

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#2B59B0', // Primary blue
      contrastText: '#FFFFFF', // White text for contrast
    },
    secondary: {
      main: '#797979', // Gray for secondary actions
    },
    background: {
      default: '#090909', // Main background color
      paper: '#1E1E20', // Card and Paper background
    },
    text: {
      primary: '#9E9EA2', // Lighter text color
      secondary: '#797979', // Subtle text color
    },
    action: {
      hover: '#3B3B3D', // Hover state color
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Arial', sans-serif", // Default font
    button: {
      textTransform: 'none', // Prevent uppercase transformation for buttons
      fontWeight: 'bold', // Bold text for buttons
    },
    h4: {
      fontWeight: 'bold', // Bold headers
      color: '#2B59B0', // Primary color for headers
    },
    body1: {
      color: '#9E9EA2', // Default text color
    },
  },
});

// Export the theme as default
export default theme;
