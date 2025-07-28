// components/ProtectedRoutes.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

// Add allowedDesignations prop for role-based protection
const ProtectedRoute = ({ children, allowedDesignations }) => {
  const { isAuthenticated, employee } = useContext(AuthContext);

  if (!isAuthenticated) return <Navigate to="/login" />;

  // If role-based restriction, check employee's designation
  if (
    allowedDesignations &&
    employee &&
    employee.emp_designation &&
    !allowedDesignations.map(d => d.toUpperCase()).includes(employee.emp_designation.toUpperCase())
  ) {
    // Not authorized
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default ProtectedRoute;
