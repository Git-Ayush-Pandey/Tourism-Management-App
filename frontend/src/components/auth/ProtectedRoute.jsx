import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Loader from "../common/Loader";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) return <Loader />;

  if (!isAuthenticated()) return <Navigate to="/login" replace />;

  if (adminOnly && !isAdmin()) return <Navigate to="/" replace />;

  return children;
};

export default ProtectedRoute;
