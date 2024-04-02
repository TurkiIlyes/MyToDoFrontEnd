import React, { useState } from "react";

import {
  checkConfirmPw,
  checkPassword,
  updatePasswordCheck,
} from "../../../../utils/formValidators/userFormValidators";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import OverlayCloseBtn from "../../overlayCloseBtn/OverlayCloseBtn";

const UpdatePasswordForm = () => {
  const token = useSelector((state) => state.auth.user.token);
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [formErrors, setFormErrors] = useState({});

  //
  const message =
    "Oops! It seems like the email is used. Please double-check and try again.";
  //
  const handleUpdate = (e) => {
    updatePasswordCheck(
      e,
      formErrors,
      setFormErrors,
      dispatch,
      Navigate,
      message,
      {
        token,
        oldPassword,
        newPassword,
        confirmNewPassword,
      }
    );
  };
  return (
    <form>
      <OverlayCloseBtn />
      <h1>update password</h1>
      <label htmlFor="old-password">old password :</label>
      <input
        type="password"
        placeholder="Old Password*"
        value={oldPassword}
        id="old-password"
        onChange={(e) => checkPassword(e, setOldPassword, setFormErrors)}
      />
      {formErrors.oldPassword && (
        <span className="error-message">{formErrors.password}</span>
      )}
      <label htmlFor="new-password">new password :</label>
      <input
        type="password"
        placeholder="New Password*"
        value={newPassword}
        id="new-password"
        onChange={(e) => checkPassword(e, setNewPassword, setFormErrors)}
      />
      {formErrors.newPassword && (
        <span className="error-message">{formErrors.password}</span>
      )}
      <label htmlFor="confirm-password">confirm password :</label>
      <input
        type="password"
        placeholder="Confirm Password*"
        value={confirmNewPassword}
        id="confirm-password"
        onChange={(e) =>
          checkConfirmPw(e, newPassword, setConfirmNewPassword, setFormErrors)
        }
      />
      {formErrors.confirmNewPassword && (
        <span className="error-message">{formErrors.confirmNewPassword}</span>
      )}
      {formErrors.access && (
        <span className="error-message">{formErrors.access}</span>
      )}
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

export default UpdatePasswordForm;
