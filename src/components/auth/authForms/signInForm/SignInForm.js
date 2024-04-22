import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  checkEmail,
  checkPassword,
  checkSignIn,
} from "../../../../utils/formValidators/userFormValidators";
import SignWith from "../SignWith";

const SignInForm = () => {
  const data = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [formErrors, setFormErrors] = useState({});

  const message =
    "Oops! It seems like the email or password you entered is incorrect. Please double-check and try again.";

  return (
    <form>
      <h1>create an account</h1>
      <span className="sub-title">
        it's easy! just take a minute and provide your details
      </span>
      <SignWith />
      <input
        type="text"
        placeholder="Email Address*"
        value={email}
        onChange={(e) => checkEmail(e, setEmail, setFormErrors)}
      />
      {formErrors.email && (
        <span className="error-message">{formErrors.email}</span>
      )}
      <input
        type="password"
        placeholder="Enter Your Password*"
        value={password}
        onChange={(e) => checkPassword(e, setPassword, setFormErrors)}
      />
      {formErrors.password && (
        <span className="error-message">{formErrors.password}</span>
      )}

      <Link to="/forgetpassword" className="forget-password-btn">
        forget your password?
      </Link>
      {formErrors.access && (
        <span className="error-message">{formErrors.access}</span>
      )}
      <Link
        to="/home"
        className="sign-btn"
        onClick={(e) =>
          checkSignIn(
            e,
            formErrors,
            setFormErrors,
            dispatch,
            Navigate,
            message,
            {
              email,
              password,
            }
          )
        }
      >
        sign in
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

export default SignInForm;
