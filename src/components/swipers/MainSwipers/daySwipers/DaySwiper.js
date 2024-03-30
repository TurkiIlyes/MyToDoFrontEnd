import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import TasksSwiper from "../../tasksSwiper/TasksSwiper";
import {
  getLteGteDate,
  getSelectedDateTasks,
} from "../../../../utils/services/taskServices";

const DaySwiper = ({ gte = 0, lte = 0, name = "" }) => {
  const [tasks, setTasks] = useState({});
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.user.token);
  const date = new Date();

  const { gteDate, lteDate } = getLteGteDate(date, gte, lte);

  useEffect(() => {
    const fetchTasks = async () => {
      setTasks(
        await getSelectedDateTasks(dispatch, Navigate, {
          token,
          gte: gteDate,
          lte: lteDate,
        })
      );
    };
    fetchTasks();
  }, []);

  return (
    <>
      <div className="section-title-box">
        <span className="section-title">{name}</span>
      </div>
      {tasks.results ? (
        <TasksSwiper tasks={tasks.data} />
      ) : (
        <div className="no-data-box">
          <span>no data found</span>
          <FontAwesomeIcon icon={faCircleExclamation} className="icon" />
        </div>
      )}
    </>
  );
};

export default DaySwiper;
