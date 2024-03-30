import React, { useState } from "react";
import "./HobiesSwiper.css";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Navigation } from "swiper/modules";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Slide = ({ data }) => {
  const [showMenu, setShowMenu] = useState(false);
  console.log(data);
  return (
    <>
      <div className="menu-box" onClick={() => setShowMenu((prev) => !prev)}>
        <FontAwesomeIcon icon={faEllipsis} className="icon" />
        {showMenu && (
          <div className="hobie-menu">
            <Link to={`/home/updatehobie/${data._id}`}>
              <button className="btn">update hobie</button>
            </Link>
            <Link to={`/home/deletehobie/${data._id}`}>
              <button className="btn">delete hobie</button>
            </Link>
          </div>
        )}
      </div>
      <Link to={`/home/showhobie/${data._id}`} className="link">
        <div className="img-box">
          {data.image !== "null" && (
            <img
              src={`${process.env.REACT_APP_API_URI}/hobie/${data.image}`}
              alt=""
            />
          )}
        </div>

        <div className="text-box">
          <span className="title">
            {data.title.length <= 12 ? data.title : data.title.slice(12)}
          </span>
          <span className="time">
            {data.startTime} - {data.endTime}
          </span>
        </div>
      </Link>
    </>
  );
};

const HobiesSwiper = () => {
  const hobies = useSelector((state) => state.auth.hobies.data);
  return (
    <Swiper
      grabCursor={true}
      centeredSlides={true}
      loop={true}
      slidesPerView={"auto"}
      pagination={{ clickable: true }}
      modules={[Pagination, Navigation]}
      className="hobies-swiper"
    >
      {hobies.map((hobieData, i) => {
        return (
          <SwiperSlide className="Hobie-slide" key={i}>
            <Slide data={hobieData} />
          </SwiperSlide>
        );
      })}

      <div className="swiper-pagination"></div>
    </Swiper>
  );
};

export default HobiesSwiper;
