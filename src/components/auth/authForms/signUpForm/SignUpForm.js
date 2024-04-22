import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck as regFaCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  checkConfirmPw,
  checkEmail,
  checkName,
  checkPassword,
  checkSignUp,
  checkTermsChecked,
} from "../../../../utils/formValidators/userFormValidators";
import SignWith from "../SignWith";

const SignUpForm = () => {
  const data = useSelector((state) => state.auth);
  console.log(data);

  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [termsChecked, setTermsChecked] = useState(true);
  const [image, setImage] = useState(null);

  const [formErrors, setFormErrors] = useState({});

  const message =
    "Oops! It seems like the email is used. Please double-check and try again.";

  return (
    <form>
      <h1>create an account</h1>
      <span className="sub-title">
        it's easy! just take a minute and provide your details
      </span>
      <SignWith />
      <input
        type="text"
        placeholder="Full Name*"
        value={fullName}
        onChange={(e) => checkName(e, setFullName, setFormErrors)}
      />
      {formErrors.fullName && (
        <span className="error-message">{formErrors.fullName}</span>
      )}
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
      <div className="image-box">
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <button className="image-btn">choose image</button>
        <span className="image-txt">
          {!image
            ? "no file chosen"
            : image.name.length >= 10
            ? "..." + image.name.slice(-10)
            : image.name}
        </span>
      </div>

      <div className="terms-box">
        {termsChecked ? (
          <FontAwesomeIcon
            icon={faCircleCheck}
            className="icon"
            onClick={() =>
              checkTermsChecked(termsChecked, setTermsChecked, setFormErrors)
            }
          />
        ) : (
          <FontAwesomeIcon
            icon={regFaCircleCheck}
            className="icon"
            onClick={() =>
              checkTermsChecked(termsChecked, setTermsChecked, setFormErrors)
            }
          />
        )}
        <div className="terms">
          <span>yes, i understand and agree to the stanley </span>
          <span>terms of service</span>
        </div>
      </div>
      {formErrors.termsChecked && (
        <span className="error-message">{formErrors.termsChecked}</span>
      )}
      {formErrors.access && (
        <span className="error-message">{formErrors.access}</span>
      )}
      <Link
        to="/checkcode"
        className="sign-btn"
        onClick={(e) =>
          checkSignUp(
            e,
            formErrors,
            setFormErrors,
            dispatch,
            Navigate,
            message,
            {
              fullName,
              email,
              password,
              confirmPw,
              image,
            }
          )
        }
      >
        create account
      </Link>

      <div className="log-box">
        <span>already have an account? </span>
        <Link to="/signin" className="change-path">
          signin
        </Link>
      </div>
    </form>
  );
};

export default SignUpForm;
