import React from "react";
import "./Footer.css";
const Footer = () => {
  return (
    <div className="footer">
      <span>
        &copy;{new Date().getFullYear()} MyToDo App by I&T. All rights reserved
      </span>
    </div>
  );
};

export default Footer;
