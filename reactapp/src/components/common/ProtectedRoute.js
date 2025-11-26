import React from 'react';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <div>Please login to access this page. <a href="/login">Login</a></div>;
  }

  if (requiredRole && currentUser.role !== requiredRole) {
    return <div>Access denied. Insufficient permissions.</div>;
  }

  return children;
};

export default ProtectedRoute;