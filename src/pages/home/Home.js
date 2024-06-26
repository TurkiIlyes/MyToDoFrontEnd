import React, { useEffect } from "react";
import MainHome from "../../components/home/mainHome/MainHome";
import RightSideBar from "../../components/home/rightSideBar/RightSideBar";
import { Outlet } from "react-router";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { getHobies } from "../../redux/slice/AuthSlice";
import Footer from "../../components/footer/Footer";
const Home = () => {
  // const dispatch = useDispatch();
  // const token = useSelector((state) => state.auth.user.token);

  // useEffect(() => {
  //   dispatch(getHobies({ token }));
  // });

  return (
    <>
      <div className="home-page">
        <MainHome />
        <RightSideBar />
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Home;
