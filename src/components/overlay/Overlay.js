import React from "react";
import "./Overlay.css";

import { Outlet, useNavigate } from "react-router-dom";

const Overlay = () => {
  const Navigate = useNavigate();
  return (
    <div className="overlay">
      <div
        className="overlay-box"
        onClick={() => {
          Navigate("/home");
        }}
      ></div>
      <Outlet />
    </div>
  );
};

export default Overlay;
