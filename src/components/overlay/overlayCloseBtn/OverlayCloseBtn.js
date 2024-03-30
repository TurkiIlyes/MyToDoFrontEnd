import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
const OverlayCloseBtn = () => {
  return (
    <Link to="/home" className="close-box">
      <FontAwesomeIcon icon={faCircleXmark} className="icon" />
    </Link>
  );
};

export default OverlayCloseBtn;
