import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import HobiesSwiper from "../../swipers/hobiesSwiper/HobiesSwiper";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import SelectedDateSwiper from "../../swipers/MainSwipers/selectedDateSwiper/SelectedDateSwiper";
import DaySwiper from "../../swipers/MainSwipers/daySwipers/DaySwiper";

const MainData = () => {
  const hobies = useSelector((state) => state.auth.hobies);
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

      {hobies.results ? (
        <HobiesSwiper />
      ) : (
        <div className="no-data-box">
          <span>no data found</span>
          <FontAwesomeIcon icon={faCircleExclamation} className="icon" />
        </div>
      )}
      <SelectedDateSwiper />
      <DaySwiper gte={2} lte={1} name="tomorow" />
      <DaySwiper gte={7} lte={0} name="current week" />
      <DaySwiper gte={14} lte={7} name="next week" />
    </>
  );
};

export default MainData;
