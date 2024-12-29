import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { signIn } from '../../api/index';
import SignInForm from './signInForm';

const LandingPage = () => {
    return (
        <SignInForm/>
       
    );
};

export default LandingPage;
