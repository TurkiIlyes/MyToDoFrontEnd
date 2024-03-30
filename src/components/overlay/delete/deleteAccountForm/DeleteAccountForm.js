import React, { useState } from "react";
import OverlayCloseBtn from "../../overlayCloseBtn/OverlayCloseBtn";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  checkPassword,
  deleteAccountCheck,
} from "../../../../utils/formValidators/userFormValidators";
const DeleteAccountForm = () => {
  const token = useSelector((state) => state.auth.user.token);
  const id = useSelector((state) => state.auth.user.data._id);
  const dispatch = useDispatch();

  const [password, setPassword] = useState("");

  const [formErrors, setFormErrors] = useState({});

  const message =
    "Oops! It seems like the password you entered is incorrect. Please double-check and try again.";

  const handleDelete = (e) => {
    deleteAccountCheck(e, formErrors, setFormErrors, dispatch, message, {
      token,
      id,
      password,
    });
  };
  return (
    <form>
      <OverlayCloseBtn />
      <h1 className="wrn-message">delete account</h1>
      <span className="sub-title">
        are you sure you want to delete your account?
      </span>
      <label htmlFor="password">Your password :</label>
      <input
        type="password"
        placeholder="Your Password*"
        id="password"
        value={password}
        onChange={(e) => checkPassword(e, setPassword, setFormErrors)}
      />
      {formErrors.password && (
        <span className="error-message">{formErrors.password}</span>
      )}
      {formErrors.access && (
        <span className="error-message">{formErrors.access}</span>
      )}
      <div className="form-btns">
        <button className="btn wrn-btn" onClick={handleDelete}>
          delete
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

export default DeleteAccountForm;
