import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

import logo from "../../../i2.png";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import "./SearchData.css";
import { getSpecTasks, getStatus } from "../../../utils/services/taskServices";

const SearchData = ({ searchData }) => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchTasks = async () => {
      setData(await getSpecTasks(dispatch, Navigate, searchData));
    };
    fetchTasks();
  }, []);
  console.log(data);
  return (
    <div className="search-data-box">
      {data.results ? (
        data.data.map((task, i) => {
          return (
            <div className="box" key={i}>
              <button
                className="menu-box"
                onClick={() => setShowMenu((prev) => !prev)}
              >
                <FontAwesomeIcon icon={faEllipsis} className="icon" />
                {showMenu && (
                  <div className="task-menu">
                    <Link to={`/home/updatetask/${task._id}`}>
                      <button className="btn">update task</button>
                    </Link>
                    <Link to={`/home/deletetask/${task._id}`}>
                      <button className="btn">delete task</button>
                    </Link>
                  </div>
                )}
              </button>

              <Link to={`/home/showtask/${task._id}`} className="link">
                <span className="task-status">{getStatus(task)}</span>
                <div className="img-box">
                  {task.image !== "null" ? (
                    <img
                      src={`${process.env.REACT_APP_API_URI}/task/${task.image}`}
                      alt=""
                      className="task-img"
                    />
                  ) : (
                    ""
                  )}
                </div>
                <div className="task-data">
                  <span className="task-title">{task.title}</span>
                </div>
              </Link>
            </div>
          );
        })
      ) : (
        <h1>No data found</h1>
      )}
    </div>
  );
};

export default SearchData;
