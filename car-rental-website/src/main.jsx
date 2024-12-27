// Import the necessary modules from 'react' and 'react-dom/client'
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Assuming your HTML file has a div with id 'root'
const container = document.getElementById('root');
const root = createRoot(container); // Create a root.

// Render the App component to the root.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
