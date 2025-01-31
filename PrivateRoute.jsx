import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

// Custom PrivateRoute component
const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem('token'); // Check if token is stored in local storage

  if (!isLoggedIn) {
    // Store the current path to redirect back after login
    localStorage.setItem('redirectPath', location.pathname);
    return <Navigate to="/auth/login" />;
  }

  return children;
};

export default PrivateRoute;