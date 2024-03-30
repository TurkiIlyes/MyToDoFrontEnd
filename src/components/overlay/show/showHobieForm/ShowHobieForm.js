import React, { useEffect, useState } from "react";

import OverlayCloseBtn from "../../overlayCloseBtn/OverlayCloseBtn";
import { getHobieData } from "../../../../utils/services/hobieServices";

import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

const ShowHobieForm = () => {
  const { id } = useParams();

  const Navigate = useNavigate();
  const token = useSelector((state) => state.auth.user.token);
  const [hobieData, setHobieData] = useState({});

  useEffect(() => {
    const fetchHobie = async () => {
      const hobieData = await getHobieData(Navigate, id, token);
      setHobieData(hobieData.data.data);
    };
    fetchHobie();
  }, []);
  return (
    <form>
      {hobieData.title && (
        <>
          <OverlayCloseBtn />
          <h1>{hobieData.title}</h1>

          <div className="show-time-box">
            <span className="sep">from</span>
            <span className="time"> {hobieData.startTime}</span>
            <span className="sep">to</span>
            <span className="time"> {hobieData.endTime}</span>
          </div>
          {hobieData.image !== "null" && (
            <div className="show-image-box">
              <img
                src={`${process.env.REACT_APP_API_URI}/hobie/${hobieData.image}`}
                alt=""
                className="img"
              />
            </div>
          )}

          <div className="form-btns">
            <Link to={`/home/updatehobie/${hobieData._id}`}>
              <button className="btn">edit</button>
            </Link>

            <Link to="/home">
              <button className="btn wrn-message">
                <span>close</span>
              </button>
            </Link>
          </div>
        </>
      )}
    </form>
  );
};

export default ShowHobieForm;
