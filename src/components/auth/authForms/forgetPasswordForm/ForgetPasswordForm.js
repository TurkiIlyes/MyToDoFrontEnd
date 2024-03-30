import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  checkEmail,
  forgetPasswordCheck,
} from "../../../../utils/formValidators/userFormValidators";
import SignWith from "../SignWith";

const ForgetPasswordForm = () => {
  const data = useSelector((state) => state.auth);
  console.log(data);

  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [formErrors, setFormErrors] = useState({});

  const message =
    "Oops! It seems like the email you entered is incorrect. Please double-check and try again.";

  return (
    <form>
      <h1>get back account</h1>
      <span className="sub-title">
        its esay! just take a minute and provide the details
      </span>
      <SignWith />
      <input
        type="text"
        placeholder="Email Addresse*"
        value={email}
        onChange={(e) => checkEmail(e, setEmail, setFormErrors)}
      />
      {formErrors.email && (
        <span className="error-message">{formErrors.email}</span>
      )}
      {formErrors.access && (
        <span className="error-message">{formErrors.access}</span>
      )}

      <Link
        to="/checkresetcode"
        className="sign-btn"
        onClick={(e) =>
          forgetPasswordCheck(
            e,
            formErrors,
            setFormErrors,
            dispatch,
            Navigate,
            message,
            {
              email,
            }
          )
        }
      >
        send code
      </Link>
      <div className="log-box">
        <span>dont have an account? </span>
        <Link to="/signup" className="change-path">
          signup
        </Link>
      </div>
    </form>
  );
};

export default ForgetPasswordForm;
