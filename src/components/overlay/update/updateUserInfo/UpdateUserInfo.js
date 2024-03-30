import React, { useState } from "react";

import OverlayCloseBtn from "../../overlayCloseBtn/OverlayCloseBtn";

import {
  checkName,
  checkUpdateUserInfo,
} from "../../../../utils/formValidators/userFormValidators";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const UpdateUserInfo = () => {
  const token = useSelector((state) => state.auth.user.token);
  const userData = useSelector((state) => state.auth.user.data);
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const [fullName, setFullName] = useState(userData.name);

  const [formErrors, setFormErrors] = useState({});

  //
  const message =
    "Oops! It seems like the email is used. Please double-check and try again.";
  //
  const handleUpdate = (e) => {
    checkUpdateUserInfo(
      e,
      formErrors,
      setFormErrors,
      dispatch,
      Navigate,
      message,
      {
        token,
        fullName,
      }
    );
  };
  return (
    <form>
      <OverlayCloseBtn />
      <h1>update info</h1>
      <label htmlFor="full-name">full name :</label>

      <label htmlFor="email">email :</label>
      <input
        type="text"
        placeholder="Email Addresse*"
        value={userData.email}
        id="email"
        readOnly
      />
      <input
        type="text"
        placeholder="Full Name*"
        value={fullName}
        id="full-name"
        onChange={(e) => checkName(e, setFullName, setFormErrors)}
      />
      {formErrors.fullName && (
        <span className="error-message">{formErrors.fullName}</span>
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

export default UpdateUserInfo;
