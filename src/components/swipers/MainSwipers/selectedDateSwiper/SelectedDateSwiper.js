import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import TasksSwiper from "../../tasksSwiper/TasksSwiper";
import {
  getSelectedDateTasks,
  getDateName,
  getLteGteDate,
} from "../../../../utils/services/taskServices";

const SelectedDateSwiper = () => {
  const [tasks, setTasks] = useState({});
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.user.token);
  const selectedDate = useSelector((state) => state.auth.selectedDate);
  const date = new Date(selectedDate);

  const { gteDate, lteDate } = getLteGteDate(date, 0, 1);

  const dateName = getDateName(date);

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
  }, [selectedDate]);

  return (
    <>
      <div className="section-title-box">
        <span className="section-title">{dateName}</span>
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

export default SelectedDateSwiper;
