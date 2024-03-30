import React from "react";
import { Outlet } from "react-router-dom";
import "./Sign.css";
import LandingSwiper from "../../components/swipers/landingSwiper/LandingSwiper";

const Sign = () => {
  return (
    <>
      <div className="sign-page">
        <main>
          <div className="container">
            <div className="sign-form">
              <Outlet />
            </div>
            <div className="sign-data">
              <LandingSwiper />
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Sign;
