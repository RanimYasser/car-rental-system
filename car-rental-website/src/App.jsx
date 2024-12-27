import { useState } from 'react';
import LandingPage from './frontend/LandingPage/LandingPage';
import RegisterForm from './frontend/LandingPage/register';
import HomePage from './frontend/customer/Homepage/HomePage';
import CarResultsPage from './frontend/Cars-Catalog/CarResultPage';
import SignInForm from './frontend/LandingPage/signInForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
     <Router>
        <Routes>
          <Route path="/" element={< LandingPage/>} />
          <Route path="/registration" element={<RegisterForm />} />
          <Route path="/signInForm" element={<SignInForm />} />
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/cars" element={<CarResultsPage/>} /> 
        </Routes>
      </Router>
    </>
  );
}

export default App;
