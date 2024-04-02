import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import HobiesSwiper from "../../swipers/hobiesSwiper/HobiesSwiper";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SelectedDateSwiper from "../../swipers/MainSwipers/selectedDateSwiper/SelectedDateSwiper";
import DaySwiper from "../../swipers/MainSwipers/daySwipers/DaySwiper";
import {
  resetHobiesUpdateState,
  resetTasksUpdateState,
} from "../../../redux/slice/AuthSlice";
import { getHobies } from "../../../utils/services/hobieServices";

const MainData = () => {
  // const hobies = useSelector((state) => state.auth.hobies);

  const dispatch = useDispatch();
  // const token = useSelector((state) => state.auth.user.token);

  const hobiesUpdateState = useSelector(
    (state) => state.auth.hobiesUpdateState
  );
  const tasksUpdateState = useSelector((state) => state.auth.tasksUpdateState);

  useEffect(() => {
    hobiesUpdateState && dispatch(resetHobiesUpdateState());
  }, [hobiesUpdateState, dispatch]);

  useEffect(() => {
    tasksUpdateState && dispatch(resetTasksUpdateState());
  }, [tasksUpdateState, dispatch]);

  return (
    <>
      <div className="today-activities">
        <span className="section-title">today activities</span>
        <div className="section-box">
          <span className="section-desc">
            Mange your habits, reminders, events, activites...
          </span>
          <Link to="/home/createtask">
            <div className="btn">
              <FontAwesomeIcon icon={faPlus} className="icon" />
              <span>new task</span>
            </div>
          </Link>
        </div>
      </div>
      <div className="section-title-box">
        <span className="section-title">your habits</span>
        <Link to="/home/createhobie">
          <div className="icon-box">
            <FontAwesomeIcon icon={faPlus} className="icon" />
          </div>
        </Link>
      </div>

      {!hobiesUpdateState ? <HobiesSwiper /> : null}
      {!tasksUpdateState ? (
        <>
          <SelectedDateSwiper />
          <DaySwiper lte={2} gte={1} name="tomorow" />
          <DaySwiper lte={7} gte={0} name="current week" />
          <DaySwiper lte={14} gte={7} name="next week" />
        </>
      ) : null}
    </>
  );
};

export default MainData;
