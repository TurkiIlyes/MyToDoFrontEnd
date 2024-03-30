import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectSignUpVerifyRoute = () => {
  const signUpVerifyObj = useSelector((state) => state.auth.signUpVerifyObj);
  console.log(signUpVerifyObj.signUpVerifyAccess, signUpVerifyObj.email);
  console.log(signUpVerifyObj.signUpVerifyAccess && signUpVerifyObj.email);
  return signUpVerifyObj.signUpVerifyAccess && signUpVerifyObj.email ? (
    <Outlet />
  ) : (
    <Navigate to="/signup" replace />
  );
};

export default ProtectSignUpVerifyRoute;
