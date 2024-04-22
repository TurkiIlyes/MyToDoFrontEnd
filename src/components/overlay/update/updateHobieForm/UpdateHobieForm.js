import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import OverlayCloseBtn from "../../overlayCloseBtn/OverlayCloseBtn";

import {
  checkTitle,
  checkStartTime,
  checkEndTime,
  checkUpdateHobie,
} from "../../../../utils/formValidators/hobieFormValidators";
import { getHobieData } from "../../../../utils/services/hobieServices";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

const UpdateHobieForm = () => {
  const token = useSelector((state) => state.auth.user.token);
  const { id } = useParams();
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [image, setImage] = useState(null);

  const [formErrors, setFormErrors] = useState({});

  const message =
    "Oops! It seems like the email is used. Please double-check and try again.";

  useEffect(() => {
    const fetchHobie = async () => {
      const hobieData = await getHobieData(Navigate, id, token);
      setTitle(hobieData.data.data.title);
      setStartTime(hobieData.data.data.startTime);
      setEndTime(hobieData.data.data.endTime);
    };
    fetchHobie();
  }, []);

  const handleUpdate = (e) => {
    checkUpdateHobie(
      e,
      formErrors,
      setFormErrors,
      dispatch,
      Navigate,
      message,
      {
        token,
        title,
        startTime,
        endTime,
        image,
        id,
      }
    );
  };
  return (
    <form>
      <OverlayCloseBtn />
      <h1>update Hobby</h1>
      <span className="sub-title">tackle your goals in daily doses</span>
      <label htmlFor="hobie-title">hobby title :</label>

      <input
        type="text"
        placeholder="Title*"
        id="hobie-title"
        value={title}
        onChange={(e) => checkTitle(e, setTitle, setFormErrors)}
      />
      {formErrors.title && (
        <span className="error-message">{formErrors.title}</span>
      )}

      <label htmlFor="start-time">start time :</label>
      <input
        type="time"
        name=""
        id="start-time"
        value={startTime}
        onChange={(e) => checkStartTime(e, setStartTime, setFormErrors)}
      />
      {formErrors.startTime && (
        <span className="error-message">{formErrors.startTime}</span>
      )}

      <label htmlFor="end-time">end time :</label>
      <input
        type="time"
        name=""
        id="end-time"
        value={endTime}
        onChange={(e) => checkEndTime(e, setEndTime, setFormErrors)}
      />
      {formErrors.endTime && (
        <span className="error-message">{formErrors.endTime}</span>
      )}

      <label htmlFor="hobie-img">hobby image :</label>
      <div className="image-box">
        <input
          type="file"
          id="hobie-img"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <FontAwesomeIcon icon={faCloudArrowUp} className="icon" />
        <span className="image-txt">
          {!image
            ? "no file choosen"
            : image.name.length >= 10
            ? "..." + image.name.slice(-10)
            : image.name}
        </span>
      </div>

      <div className="form-btns">
        <button className="btn" onClick={handleUpdate}>
          update
        </button>
        {/* <Link to="/home"> */}
        <button
          className="btn wrn-message"
          onClick={() => {
            Navigate("/home");
          }}
        >
          <span>cancel</span>
        </button>
        {/* </Link> */}
      </div>
    </form>
  );
};

export default UpdateHobieForm;
