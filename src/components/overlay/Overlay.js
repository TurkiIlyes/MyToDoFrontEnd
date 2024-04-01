import React, { useEffect } from "react";
import "./Overlay.css";

import { Outlet, useNavigate } from "react-router-dom";

const Overlay = () => {
  const Navigate = useNavigate();

  const toggleOverlay = () => {
    document.body.classList.toggle("active-overlay");
    Navigate("/home");
  };
  useEffect(() => {
    document.body.classList.toggle("active-overlay", true);
    return () => {
      document.body.classList.remove("active-overlay");
    };
  }, []);

  return (
    <div className="overlay">
      <div
        className="overlay-box"
        onClick={() => {
          toggleOverlay();
        }}
      ></div>
      <Outlet />
    </div>
  );
};

export default Overlay;
