import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import OverlayCloseBtn from "../../overlayCloseBtn/OverlayCloseBtn";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  checkCreateHobie,
  checkEndTime,
  checkStartTime,
  checkTitle,
} from "../../../../utils/formValidators/hobieFormValidators";

const CreateHobieForm = () => {
  const token = useSelector((state) => state.auth.user.token);
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [image, setImage] = useState(null);

  const [formErrors, setFormErrors] = useState({});

  const message =
    "Oops! It seems that there is a problem. Please double-check and try again.";

  const handleCreate = (e) => {
    checkCreateHobie(
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
      }
    );
  };
  const handleCreateMore = (e) => {
    handleCreate(e);
    setTitle("");
    setStartTime("");
    setEndTime("");
    setImage(null);
    setFormErrors({});
  };
  return (
    <form>
      <OverlayCloseBtn />
      <h1>add Hobby</h1>
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
            ? "no file chosen"
            : image.name.length >= 10
            ? "..." + image.name.slice(-10)
            : image.name}
        </span>
      </div>
      {formErrors.access && (
        <span className="error-message">{formErrors.access}</span>
      )}
      <div className="form-btns">
        <button className="btn" onClick={handleCreate}>
          save hobby
        </button>
        <button className="btn" onClick={handleCreateMore}>
          <FontAwesomeIcon icon={faPlus} className="icon" />
          <span>add another</span>
        </button>
      </div>
    </form>
  );
};

export default CreateHobieForm;
