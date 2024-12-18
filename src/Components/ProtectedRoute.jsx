import React from "react";
import { useAuth } from "./Hooks/useAuth";
import { Navigate } from "react-router-dom";
import LoaderIcon from "./Loader";
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <LoaderIcon />;
  if (!user) return <Navigate to="/login" />;
  return children;
};

export default ProtectedRoute;
