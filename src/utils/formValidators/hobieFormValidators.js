import { getHobies, setHobiesUpdateState } from "../../redux/slice/AuthSlice";
import { catchGlobalError, emptyFildsError } from "../services/globalServices";
import {
  createHobieService,
  deleteHobieService,
  updateHobieService,
} from "../services/hobieServices";

const titleRegex = /^[a-zA-Z-' ]{1,60}$/;

export const checkTitle = (e, setTitle, setFormErrors) => {
  const newTitle = e.target.value;
  setTitle(newTitle);
  setFormErrors((prev) => ({
    ...prev,
    title: !titleRegex.test(newTitle) ? "Please enter a valid title." : "",
  }));
};
export const checkStartTime = (e, setStartTime, setFormErrors) => {
  const newTime = e.target.value;
  console.log(newTime);
  setStartTime(newTime);
  setFormErrors((prev) => ({
    ...prev,
    startTime: "",
  }));

  // !startTimeRegex.test(newTime)
  //     ? "Please enter a valid start Time."
  //     :
};
export const checkEndTime = (e, setEndTime, setFormErrors) => {
  const newTime = e.target.value;
  setEndTime(newTime);
  setFormErrors((prev) => ({
    ...prev,
    endTime: "",
  }));

  // !endTimeRegex.test(newTime)
  //     ? "Please enter a valid end Time."
  //     :
};

export const checkCreateHobie = async (
  e,
  formErrors,
  setFormErrors,
  dispatch,
  Navigate,
  message,
  hobieData
) => {
  e.preventDefault();
  if (hobieData.title && hobieData.startTime && hobieData.endTime) {
    if (!formErrors.title && !formErrors.startTime && !formErrors.endTime) {
      try {
        await createHobieService(hobieData, Navigate);
        dispatch(setHobiesUpdateState());
      } catch (err) {
        catchGlobalError(setFormErrors, err, message, dispatch);
      }
    }
  } else {
    emptyFildsError(setFormErrors);
  }
};

export const checkUpdateHobie = async (
  e,
  formErrors,
  setFormErrors,
  dispatch,
  Navigate,
  message,
  hobieData
) => {
  e.preventDefault();
  if (!formErrors.title && !formErrors.startTime && !formErrors.endTime) {
    try {
      await updateHobieService(hobieData, Navigate);
      dispatch(setHobiesUpdateState());
    } catch (err) {
      catchGlobalError(setFormErrors, err, message, dispatch);
    }
  }
};

export const deleteHobieCheck = async (
  e,
  setFormErrors,
  Navigate,
  dispatch,
  message,
  hobieData
) => {
  e.preventDefault();
  try {
    console.log(hobieData);
    await deleteHobieService(hobieData, Navigate);
    dispatch(setHobiesUpdateState());
  } catch (err) {
    catchGlobalError(setFormErrors, err, message, dispatch);
  }
};
