
import React from 'react';
import { Navigate } from 'react-router-dom';

const RegisterPage = () => {
  // Redirect to login page since we handle both login and register there
  return <Navigate to="/login" replace />;
};

export default RegisterPage;
