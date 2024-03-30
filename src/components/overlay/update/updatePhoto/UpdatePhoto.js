import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import OverlayCloseBtn from "../../overlayCloseBtn/OverlayCloseBtn";

import { checkUpdateImage } from "../../../../utils/formValidators/userFormValidators";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const UpdatePhoto = () => {
  const token = useSelector((state) => state.auth.user.token);

  const dispatch = useDispatch();

  const Navigate = useNavigate();

  const [image, setImage] = useState(null);

  const [formErrors, setFormErrors] = useState({});
  //
  const message =
    "Oops! It seems like you put a wrong image format. Please double-check and try again.";
  //
  const handleUpdate = (e) => {
    checkUpdateImage(
      e,
      formErrors,
      setFormErrors,
      dispatch,
      Navigate,
      message,
      { token, image }
    );
  };
  return (
    <form>
      <OverlayCloseBtn />
      <h1>update photo</h1>

      <label htmlFor="update-photo">update image :</label>
      <div className="image-box">
        <input
          type="file"
          id="update-photo"
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
      {formErrors.access && (
        <span className="error-message">{formErrors.access}</span>
      )}
      <div className="form-btns">
        <button className="btn" onClick={handleUpdate}>
          update
        </button>
        <Link to="/home">
          <button className="btn wrn-message">
            <span>cancel</span>
          </button>
        </Link>
      </div>
    </form>
  );
};

export default UpdatePhoto;
