import { useState } from 'react';
import LandingPage from './frontend/LandingPage/LandingPage';
import RegisterForm from './frontend/LandingPage/register';
import HomePage from './frontend/customer/Homepage/HomePage';
import CarResultsPage from './frontend/customer/CarResultPage';
import SignInForm from './frontend/LandingPage/signInForm';
import ReserveCarForm from './frontend/customer/ReserveCarForm';
import ConfirmationPage from './frontend/customer/confirmationPage';
import AdminHomePage from './frontend/admin/Pages/AdminHomePage/AdminHomePage';
import AddCarForm from './frontend/admin/Pages/AddCarForm';
import CreateReports from './frontend/admin/Pages/CreateReports';
import UpdateCarStatus from './frontend/admin/Pages/updateCarStaus';

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
          <Route path ="/car reservation"element={<ReserveCarForm/>}/>
          <Route path ="/confirmationPage"element={<ConfirmationPage/>}/>
          <Route path ="/AdminHomePage"element={<AdminHomePage/>}/>
       <Route path= "/AddCarForm" element={<AddCarForm/>}/>
          <Route path ="/report"element={<CreateReports/>}/>
          <Route path ="/update car status"element={<UpdateCarStatus/>}/>

        </Routes>
      </Router>
    </>
  );
}

export default App;
