import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const HidenRoutes = () => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  return isAuth ? <Navigate to="/home" replace /> : <Outlet />;
};

export default HidenRoutes;
