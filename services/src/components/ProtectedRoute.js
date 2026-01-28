import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Vérifier si l'admin est connecté
  const isAdminLoggedIn = () => {
    const adminSession = localStorage.getItem('admin_session');
    if (!adminSession) return false;
    
    try {
      const session = JSON.parse(adminSession);
      const now = new Date();
      const expiresAt = new Date(session.expiresAt);
      
      return now < expiresAt;
    } catch (error) {
      return false;
    }
  };

  // Si pas connecté, rediriger vers la page de login admin
  if (!isAdminLoggedIn()) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedRoute;