import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectForgetPwRoute = () => {
  const resetPwObj = useSelector((state) => state.auth.resetPwObj);
  return resetPwObj.forgetPwReq && resetPwObj.email ? (
    <Outlet />
  ) : (
    <Navigate to="/forgetpassword" replace />
  );
};

export const ProtectCheckPwResetRoute = () => {
  const resetPwObj = useSelector((state) => state.auth.resetPwObj);

  return resetPwObj.forgetPwReq &&
    resetPwObj.email &&
    resetPwObj.checkPwReset ? (
    <Outlet />
  ) : (
    <Navigate to="/forgetpassword" replace />
  );
};
