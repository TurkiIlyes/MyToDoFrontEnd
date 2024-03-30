import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/slice/AuthSlice";
import RightSideBar from "../home/rightSideBar/RightSideBar";
const Header = () => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogOut = () => {
    dispatch(logOut());
  };
  return (
    <header>
      <div className="container">
        <a href="#" className="logo">
          myToDo
        </a>
        <nav>
          <FontAwesomeIcon
            icon={faBars}
            className="menu-icon"
            onClick={() => setShowMenu(!showMenu)}
          />
          <ul className={showMenu ? `showMenu` : ""}>
            {isAuth ? (
              <li className="right-side-list">
                {showMenu ? (
                  <RightSideBar showSideBar={showMenu} />
                ) : (
                  <NavLink
                    to="/signin"
                    className="log-out"
                    onClick={handleLogOut}
                  >
                    log out
                  </NavLink>
                )}
              </li>
            ) : (
              <>
                <li>
                  <NavLink
                    to="/signup"
                    className={({ isActive }) => {
                      return isActive ? "active" : "not-active";
                    }}
                  >
                    sign up
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/signin"
                    className={({ isActive }) => {
                      return isActive ? "active" : "not-active";
                    }}
                  >
                    log in
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
