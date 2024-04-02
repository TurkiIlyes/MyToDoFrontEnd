import React, { useEffect, useState } from "react";

import OverlayCloseBtn from "../../overlayCloseBtn/OverlayCloseBtn";
import { useParams } from "react-router";

import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  getStatus,
  getTaskData,
} from "../../../../utils/services/taskServices";

const ShowTaskForm = () => {
  const { id } = useParams();

  const Navigate = useNavigate();
  const token = useSelector((state) => state.auth.user.token);
  const [taskData, setTaskData] = useState({});

  useEffect(() => {
    const fetchTask = async () => {
      const taskData = await getTaskData(Navigate, id, token);
      setTaskData(taskData.data.data);
    };
    fetchTask();
  }, []);

  return (
    <form>
      {taskData.title && (
        <>
          <OverlayCloseBtn />
          <h1>{taskData.title}</h1>
          {taskData.details ? (
            <span className="details">{taskData.details}</span>
          ) : null}

          <div className="show-status-box">
            <span className="title">status :</span>
            <span className="status">{getStatus(taskData)}</span>
          </div>

          <div className="show-date-box">
            <span className="title">start :</span>
            <span className="time">
              {new Date(taskData.startDate).toDateString()}
            </span>
          </div>
          {taskData.image !== "null" && (
            <div className="show-image-box">
              <img
                src={`${process.env.REACT_APP_API_URI}/task/${taskData.image}`}
                alt=""
                className="img"
              />
            </div>
          )}

          <div className="form-btns">
            {/* <Link to={}> */}
            <button
              className="btn"
              onClick={() => {
                Navigate(`/home/updatetask/${taskData._id}`);
              }}
            >
              edit
            </button>
            {/* </Link> */}

            {/* <Link to="/home"> */}
            <button
              className="btn wrn-message"
              onClick={() => {
                Navigate("/home");
              }}
            >
              <span>close</span>
            </button>
            {/* </Link> */}
          </div>
        </>
      )}
    </form>
  );
};

export default ShowTaskForm;
