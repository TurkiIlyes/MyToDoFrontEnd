import {
  catchGlobalError,
  catchSignInError,
  emptyFildsError,
} from "../services/globalServices";
import {
  UpdateUserInfoService,
  changePasswordService,
  deleteAccountService,
  forgetPasswordService,
  resetCodeService,
  signInService,
  signUpService,
  signUpCodeService,
  updateImageService,
  updatePasswordService,
} from "../services/userServices";

const fullNameRegex = /^[a-zA-Z-' ]{1,30}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const codeRegex = /^\d{6}$/;

export const checkName = (e, setFullName, setFormErrors) => {
  const newName = e.target.value;
  setFullName(newName);
  setFormErrors((prev) => ({
    ...prev,
    fullName: !fullNameRegex.test(newName)
      ? "Please enter a valid full name."
      : "",
  }));
};

export const checkEmail = (e, setEmail, setFormErrors) => {
  const newEmail = e.target.value;
  setEmail(newEmail);
  setFormErrors((prev) => ({
    ...prev,
    email: !emailRegex.test(newEmail)
      ? "Please enter a valid email address."
      : "",
  }));
};

export const checkPassword = (e, setPassword, setFormErrors) => {
  const newPassword = e.target.value;
  setPassword(newPassword);
  setFormErrors((prev) => ({
    ...prev,
    password: !passwordRegex.test(newPassword)
      ? "Password must be 8+ characters with uppercase, lowercase, numbers, and special characters."
      : "",
  }));
};
export const checkConfirmPw = (e, password, setConfirmPw, setFormErrors) => {
  const newConfirmPw = e.target.value;
  setConfirmPw(newConfirmPw);
  setFormErrors((prev) => ({
    ...prev,
    confirmPw:
      newConfirmPw !== password || !passwordRegex.test(newConfirmPw)
        ? "Passwords do not match."
        : "",
  }));
};
export const checkTermsChecked = (
  termsChecked,
  setTermsChecked,
  setFormErrors
) => {
  setTermsChecked((prev) => !prev);
  setFormErrors((prev) => ({
    ...prev,
    termsChecked: termsChecked
      ? "You must agree to the terms and conditions."
      : "",
  }));
};

export const checkCode = (e, setCode, setFormErrors) => {
  const newCode = e.target.value;
  setCode(newCode);
  setFormErrors((prev) => ({
    ...prev,
    code: !codeRegex.test(newCode) ? "Please enter a valid code." : "",
  }));
};
/////////////////////////////////////////
export const deleteAccountCheck = async (
  e,
  formErrors,
  setFormErrors,
  dispatch,
  message,
  userData
) => {
  e.preventDefault();
  if (userData.password) {
    if (!formErrors.password) {
      try {
        await deleteAccountService(userData, dispatch);
      } catch (err) {
        catchGlobalError(setFormErrors, err, message, dispatch);
      }
    }
  } else {
    emptyFildsError(setFormErrors);
  }
};
export const checkUpdateImage = async (
  e,
  formErrors,
  setFormErrors,
  dispatch,
  Navigate,
  message,
  userData
) => {
  e.preventDefault();

  if (!formErrors.image && userData.image) {
    try {
      await updateImageService(userData, dispatch, Navigate);
    } catch (err) {
      catchGlobalError(setFormErrors, err, message, dispatch);
    }
  }
};
export const checkUpdateUserInfo = async (
  e,
  formErrors,
  setFormErrors,
  dispatch,
  Navigate,
  message,
  userData
) => {
  e.preventDefault();

  if (!formErrors.fullName && userData.fullName) {
    try {
      await UpdateUserInfoService(userData, dispatch, Navigate);
    } catch (err) {
      catchGlobalError(setFormErrors, err, message, dispatch);
    }
  }
};
export const updatePasswordCheck = async (
  e,
  formErrors,
  setFormErrors,
  dispatch,
  Navigate,
  message,
  userData
) => {
  e.preventDefault();
  if (
    userData.oldPassword &&
    userData.newPassword &&
    userData.confirmNewPassword
  ) {
    if (
      !formErrors.oldPassword &&
      !formErrors.newPassword &&
      !formErrors.confirmNewPassword
    ) {
      try {
        await updatePasswordService(userData, dispatch, Navigate);
      } catch (err) {
        catchGlobalError(setFormErrors, err, message, dispatch);
      }
    }
  } else {
    emptyFildsError(setFormErrors);
  }
};

export const checkSignIn = async (
  e,
  formErrors,
  setFormErrors,
  dispatch,
  Navigate,
  message,
  userData
) => {
  e.preventDefault();
  if (
    !formErrors.email &&
    !formErrors.password &&
    userData.email &&
    userData.password
  ) {
    try {
      await signInService(userData, dispatch, Navigate);
    } catch (err) {
      catchSignInError(setFormErrors, err, message);
    }
  }
};

export const forgetPasswordCheck = async (
  e,
  formErrors,
  setFormErrors,
  dispatch,
  Navigate,
  message,
  userData
) => {
  e.preventDefault();

  if (!formErrors.email && userData.email) {
    try {
      await forgetPasswordService(userData, dispatch, Navigate);
    } catch (err) {
      catchGlobalError(setFormErrors, err, message, dispatch);
    }
  }
};

export const changePasswordCheck = async (
  e,
  formErrors,
  setFormErrors,
  dispatch,
  Navigate,
  message,
  userData
) => {
  e.preventDefault();

  if (
    !formErrors.password &&
    !formErrors.confirmPw &&
    userData.password &&
    userData.confirmPw
  ) {
    try {
      await changePasswordService(userData, dispatch, Navigate);
    } catch (err) {
      catchGlobalError(setFormErrors, err, message, dispatch);
    }
  }
};

export const resetCodeCheck = async (
  e,
  formErrors,
  setFormErrors,
  dispatch,
  Navigate,
  message,
  userData
) => {
  e.preventDefault();

  if (!formErrors.code && userData.code) {
    try {
      await resetCodeService(userData, dispatch, Navigate);
    } catch (err) {
      catchGlobalError(setFormErrors, err, message, dispatch);
    }
  }
};

export const checkSignUp = async (
  e,
  formErrors,
  setFormErrors,
  dispatch,
  Navigate,
  message,
  userData
) => {
  e.preventDefault();

  if (
    !formErrors.fullName &&
    !formErrors.email &&
    !formErrors.password &&
    !formErrors.confirmPw &&
    userData.fullName &&
    userData.email &&
    userData.password &&
    userData.confirmPw
  ) {
    try {
      await signUpService(userData, dispatch, Navigate);
    } catch (err) {
      catchGlobalError(setFormErrors, err, message, dispatch);
    }
  }
};

export const signUpCodeCheck = async (
  e,
  formErrors,
  setFormErrors,
  dispatch,
  Navigate,
  message,
  userData
) => {
  e.preventDefault();
  if (!formErrors.code && userData.code) {
    try {
      await signUpCodeService(userData, dispatch, Navigate);
    } catch (err) {
      catchGlobalError(setFormErrors, err, message, dispatch);
    }
  }
};
