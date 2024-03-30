import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Outlet } from "react-router";
import { useSelector } from "react-redux";
import MainData from "../mainData/MainData";
import "./MainHome.css";
import SearchData from "../searchData/SearchData";

const MainHome = () => {
  const token = useSelector((state) => state.auth.user.token);
  const [searchFor, setSearchFor] = useState("");

  return (
    <div className="main-home">
      <div className="search-bar">
        <FontAwesomeIcon icon={faMagnifyingGlass} className="icon" />
        <input
          type="text"
          name=""
          id=""
          placeholder="search..."
          value={searchFor}
          onChange={(e) => setSearchFor(e.target.value)}
        />
      </div>
      {searchFor ? (
        <SearchData searchData={{ q: searchFor, token }} />
      ) : (
        <MainData />
      )}

      <Outlet />
    </div>
  );
};

export default MainHome;
