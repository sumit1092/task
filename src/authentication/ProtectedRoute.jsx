import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const authUser = JSON.parse(localStorage.getItem("authUser"));
  
  if (!authUser) {
    return <Navigate to="/" replace />; // Redirect to login
  }

  return children;
};

export default ProtectedRoute;
