// components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ allowedRole, children }) => {
  const { user } = React.useContext(AuthContext);

  if (!user) {
    // Not logged in
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && user.role !== allowedRole) {
    // Redirect user to their own dashboard if role mismatch
    if (user.role === 'candidate') {
      return <Navigate to="/candidate-dashboard" replace />;
    } else if (user.role === 'recruiter') {
      return <Navigate to="/recruiter-dashboard" replace />;
    } else {
      // fallback to login if role unknown
      return <Navigate to="/login" replace />;
    }
  }

  return children;
};


export default ProtectedRoute;
