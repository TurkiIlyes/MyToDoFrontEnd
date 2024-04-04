import React, { useState } from "react";
import "./RightSideBar.css";
import Calendar from "../../calendar/Calendar";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import ThemeSwitcher from "../../theme/ThemeSwitcher";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../../redux/slice/AuthSlice";

import { NavLink } from "react-router-dom";

const RightSideBar = ({ showSideBar }) => {
  const user = useSelector((state) => state.auth.user.data);

  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(logOut());
  };

  return (
    <div
      className={`right-side-bar ${
        showSideBar ? "show-in-header" : "show-in-side"
      }`}
    >
      <div className="profil-tools">
        <ThemeSwitcher />
        <div className="user-tools-box">
          <Link to="/home/updateimage">
            {user.image !== "null" ? (
              <img
                src={`${process.env.REACT_APP_API_URI}/profil/${user.image}`}
                alt=""
              />
            ) : (
              <span className="char-image">{user.name[0]}</span>
            )}
          </Link>

          <span className="user-name">
            {user.name.length <= 12 ? user.name : user.name.slice(12)}
          </span>
          <button
            className="menu-icon-box"
            onClick={() => setShowMenu((prev) => !prev)}
          >
            <FontAwesomeIcon icon={faAngleDown} className="icon" />
          </button>

          {showMenu && (
            <>
              <div
                className="menu-overlay"
                onClick={() => {
                  setShowMenu(false);
                }}
              ></div>
              <div className="profile-menu">
                <Link to="/home/updateinfo">
                  <button className="btn">update info</button>
                </Link>
                <Link to="/home/updatepassword">
                  <button className="btn">update password</button>
                </Link>
                <Link to="/home/deleteaccount">
                  <button className="btn">delete account</button>
                </Link>
                {showSideBar && (
                  <NavLink to="/signin" onClick={handleLogOut}>
                    <button className="btn">log out</button>
                  </NavLink>
                )}
              </div>
            </>
          )}
        </div>
      </div>
      <div className="calender-box">
        <Calendar />
      </div>
      {/* <div className="show-boxs">
        <span className="show-box">your habits</span>
        <span className="show-box">work</span>
        <span className="show-box">reminders</span>
        <span className="show-box">tomorow</span>
        <span className="show-box">all days</span>
        <span className="show-box">work</span>
        <span className="show-box">reminders</span>
        <span className="show-box">school</span>
        <span className="show-box">your habits</span>
        <span className="show-box">your habits</span>
        <span className="show-box">reminders</span>
      </div> */}
    </div>
  );
};

export default RightSideBar;
