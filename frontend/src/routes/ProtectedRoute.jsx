import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ roles, children }) => {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" />;

  try {
    const { role } = JSON.parse(atob(token.split(".")[1]));
    return roles.includes(role) ? children : <Navigate to="/login" />;
  } catch {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
