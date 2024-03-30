import React, { useEffect } from "react";
import MainHome from "../../components/home/mainHome/MainHome";
import RightSideBar from "../../components/home/rightSideBar/RightSideBar";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { getHobies } from "../../redux/slice/AuthSlice";
const Home = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.user.token);
  useEffect(() => {
    dispatch(getHobies({ token }));
  });
  return (
    <div className="home-page">
      <MainHome />
      <RightSideBar />
    </div>
  );
};

export default Home;
