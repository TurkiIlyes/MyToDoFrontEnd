import React, { useEffect, useState } from "react";

import ReactSwitch from "react-switch";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

import "./ThemeSwitcher.css";

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState(document.body.className);
  console.log("toktok", theme);
  // useEffect(() => {
  //   setTheme(() =>
  //     document.body.classList.contains("light") ? "light" : "dark"
  //   );
  //   console.log("toktok", theme);
  // }, []);

  const handleChangeTheme = () => {
    document.body.classList.toggle("light");
    document.body.classList.toggle("dark");
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className="theme-box">
      <ReactSwitch
        checked={theme === "light" ? true : false}
        onChange={handleChangeTheme}
        onColor="#F7AB4B"
        offColor="#43434F"
        uncheckedHandleIcon={
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              color: "#43434F",
            }}
          >
            <FontAwesomeIcon icon={faMoon} />
          </div>
        }
        checkedHandleIcon={
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              color: "#F7AB4B",
            }}
          >
            <FontAwesomeIcon icon={faSun} />
          </div>
        }
        checkedIcon={
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            day
          </div>
        }
        uncheckedIcon={
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              marginRight: "10px",
            }}
          >
            night
          </div>
        }
        className="react-switch"
        handleDiameter={28}
        height={42}
        width={105}
      />
    </div>
  );
};

export default ThemeSwitcher;
