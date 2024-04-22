import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  checkCode,
  resetCodeCheck,
} from "../../../../utils/formValidators/userFormValidators";
import SignWith from "../SignWith";

const CheckResetCodeForm = () => {
  const data = useSelector((state) => state.auth);
  console.log(data);

  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const resetPwObj = useSelector((state) => state.auth.resetPwObj);

  const [code, setCode] = useState("");

  const [formErrors, setFormErrors] = useState({});
  const message =
    "Oops! It seems like the code you entered is incorrect. Please double-check and try again.";

  return (
    <form>
      <h1>Check verification code</h1>
      <span className="sub-title">
        it's easy! just take a minute and provide the details
      </span>
      <SignWith />

      <input
        type="text"
        placeholder="Reset Code*"
        value={code}
        onChange={(e) => checkCode(e, setCode, setFormErrors)}
      />
      {formErrors.code && (
        <span className="error-message">{formErrors.code}</span>
      )}
      {formErrors.access && (
        <span className="error-message">{formErrors.access}</span>
      )}

      <Link
        to="/changepassword"
        className="sign-btn"
        onClick={(e) =>
          resetCodeCheck(
            e,
            formErrors,
            setFormErrors,
            dispatch,
            Navigate,
            message,
            {
              code,
              resetPwObj,
            }
          )
        }
      >
        Check code
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

export default CheckResetCodeForm;
