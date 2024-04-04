import React, { useEffect, useState } from "react";
import "./HobiesSwiper.css";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Navigation } from "swiper/modules";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getHobies } from "../../../utils/services/hobieServices";

const Slide = ({ data, showOverlay, setShowOverlay }) => {
  const [showMenu, setShowMenu] = useState(false);

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
  // const hobies = useSelector((state) => state.auth.hobies.data);
  const [showOverlay, setShowOverlay] = useState(false);
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [hobies, setHobies] = useState([]);
  const token = useSelector((state) => state.auth.user.token);

  useEffect(() => {
    const fetchHobies = async () => {
      const data = await getHobies(dispatch, Navigate, { token });
      setHobies(data.data);
    };
    fetchHobies();
  }, []);

  return (
    <>
      {hobies.length ? (
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
          className="hobies-swiper"
        >
          {hobies.map((hobieData, i) => {
            return (
              <SwiperSlide className="Hobie-slide" key={i}>
                <Slide
                  data={hobieData}
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
      ) : (
        <div className="no-data-box">
          <span>no data found</span>
          <FontAwesomeIcon icon={faCircleExclamation} className="icon" />
        </div>
      )}
    </>
  );
};

export default HobiesSwiper;
