import { logOut } from "../../redux/slice/AuthSlice";

export const emptyFildsError = (setFormErrors) => {
  setFormErrors({
    access:
      "Oops! required filds can't be empty. Please double-check and try again.",
  });
  setTimeout(() => {
    setFormErrors({});
  }, 4000);
};
export const catchGlobalError = (setFormErrors, err, message, dispatch) => {
  if (err.response.status === 401) {
    dispatch(logOut());
  }
  setFormErrors({
    access:
      err.response.status === 400
        ? message
        : "Oops! some thing went wrong. Please double-check and try again.",
  });
  setTimeout(() => {
    setFormErrors({});
  }, 4000);
};

export const catchSignInError = (setFormErrors, err, message) => {
  setFormErrors({
    access:
      err.response.status === 401 || err.response.status === 400
        ? message
        : "Oops! some thing went wrong. Please double-check and try again.",
  });
  setTimeout(() => {
    setFormErrors({});
  }, 4000);
};
