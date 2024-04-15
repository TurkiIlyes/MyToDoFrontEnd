import React, { useRef } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./LandingSwiper.css";

import { Autoplay, Pagination, Navigation } from "swiper/modules";

const LandingSwiper = () => {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  return (
    <>
      <Swiper
        grabCursor={true}
        loop={true}
        spaceBetween={30}
        //
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="landing-swiper"
      >
        <SwiperSlide>
          <img
            src="https://img.freepik.com/free-vector/giant-check-list_23-2148084003.jpg?w=740&t=st=1706305616~exp=1706306216~hmac=50cad8b150b497f09521956e000b13ea8d2962c8f78683890b0d467c668de3d2"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://i.pinimg.com/736x/55/44/45/55444587854d4dd065694f05a345c260.jpg"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://static.vecteezy.com/system/resources/previews/004/809/167/non_2x/the-girl-is-sitting-on-a-mountain-of-books-the-woman-is-reading-a-book-vector.jpg"
            alt=""
          />
        </SwiperSlide>
        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </>
  );
};

export default LandingSwiper;
