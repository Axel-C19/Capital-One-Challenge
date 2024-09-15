import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // Verificamos si el token está en el localStorage

  if (!token) {
    return <Navigate to="/signup" />; // Si no hay token, redirige a la página de login
  }

  return children; // Si hay token, renderiza el componente hijo
};

export default ProtectedRoute;
