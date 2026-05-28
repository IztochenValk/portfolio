import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "@hooks/useAuth";

const RedirectIfAuthenticated = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = useAuth();
  return isAuthenticated ? <Navigate to="/dashboard" /> : children;
};

export default RedirectIfAuthenticated;

