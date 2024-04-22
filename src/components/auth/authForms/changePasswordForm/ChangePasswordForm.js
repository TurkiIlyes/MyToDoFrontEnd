import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import SignWith from "../SignWith";
import {
  changePasswordCheck,
  checkConfirmPw,
  checkPassword,
} from "../../../../utils/formValidators/userFormValidators";

const ChangePasswordForm = () => {
  const data = useSelector((state) => state.auth);
  console.log(data);

  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const resetPwObj = useSelector((state) => state.auth.resetPwObj);

  const [password, setPassword] = useState("");
  const [confirmPw, setConfirmPw] = useState("");

  const [formErrors, setFormErrors] = useState({});

  const message =
    "Oops! It seems like the code you entered is incorrect. Please double-check and try again.";

  return (
    <form>
      <h1>Change password</h1>
      <span className="sub-title">
        it's easy! just take a minute and provide your details
      </span>
      <SignWith />

      <input
        type="password"
        placeholder="Enter Your Password*"
        value={password}
        onChange={(e) => checkPassword(e, setPassword, setFormErrors)}
      />
      {formErrors.password && (
        <span className="error-message">{formErrors.password}</span>
      )}
      <input
        type="password"
        placeholder="Confirm Password*"
        value={confirmPw}
        onChange={(e) =>
          checkConfirmPw(e, password, setConfirmPw, setFormErrors)
        }
      />
      {formErrors.confirmPw && (
        <span className="error-message">{formErrors.confirmPw}</span>
      )}

      <Link
        to="/home"
        className="sign-btn"
        onClick={(e) =>
          changePasswordCheck(
            e,
            formErrors,
            setFormErrors,
            dispatch,
            Navigate,
            message,
            {
              resetPwObj,
              password,
              confirmPw,
            }
          )
        }
      >
        Change
      </Link>
      <div className="log-box">
        <span>don't have an account? </span>
        <Link to="/signup" className="change-path">
          sign up
        </Link>
      </div>
    </form>
  );
};

export default ChangePasswordForm;
