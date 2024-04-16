import React, { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Navigation } from "swiper/modules";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

import "./TasksSwiper.css";
import { Link } from "react-router-dom";
import { getStatus } from "../../../utils/services/taskServices";

const Slide = ({ task, showOverlay, setShowOverlay }) => {
  const [showMenu, setShowMenu] = useState(false);

  // console.log("showOverlay", showOverlay, "showMenu", showMenu);
  const handleMenu = () => {
    setShowMenu((prev) => !prev);
    setShowOverlay((prev) => !prev);
  };
  useEffect(() => {
    if (!showOverlay) {
      setShowMenu(false);
    }
  }, [showOverlay]);
  return (
    <>
      <div className="menu-box" onClick={handleMenu}>
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
      </div>

      <Link to={`/home/showtask/${task._id}`} className="link">
        <span className="task-status">{getStatus(task)}</span>
        <div className="img-box">
          {task.image !== "null" && (
            <img
              src={`${process.env.REACT_APP_API_URI}/task/${task.image}`}
              alt=""
              className="task-img"
            />
          )}
        </div>
        <div className="task-data">
          <span className="task-title">
            {task.title.length < 10
              ? task.title
              : task.title.slice(0, 10) + "..."}
          </span>
        </div>
      </Link>
    </>
  );
};

const TasksSwiper = ({ tasks }) => {
  const [showOverlay, setShowOverlay] = useState(false);
  return (
    <Swiper
      grabCursor={true}
      centeredSlides={true}
      loop={true}
      slidesPerView={"auto"}
      pagination={{ clickable: true }}
      navigation={{
        clickable: true,
      }}
      modules={[Pagination, Navigation]}
      className="tasks-swiper"
    >
      {tasks.map((task, i) => {
        return (
          <SwiperSlide className="task-slide" key={i}>
            <Slide
              task={task}
              showOverlay={showOverlay}
              setShowOverlay={setShowOverlay}
            />
          </SwiperSlide>
        );
      })}
      {showOverlay && (
        <div
          className="menu-overlay"
          onClick={() => {
            setShowOverlay(false);
          }}
        ></div>
      )}
      <div className="swiper-pagination"></div>
    </Swiper>
  );
};

export default TasksSwiper;
