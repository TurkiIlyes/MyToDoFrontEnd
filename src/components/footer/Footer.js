import React from "react";
import "./Footer.css";
const Footer = () => {
  return (
    <div className="footer">
      <span>&copy;{new Date().getFullYear()} I&T</span>
    </div>
  );
};

export default Footer;
