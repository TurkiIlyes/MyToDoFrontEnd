import { catchGlobalError, emptyFildsError } from "../services/globalServices";
import {
  createTaskService,
  deleteTaskService,
  updateTaskService,
} from "../services/taskServices";

const titleRegex = /^[a-zA-Z-' ]{1,60}$/;
const detailsRegex = /^[a-zA-Z-' ]{1,256}$/;

export const checkTitle = (e, setTitle, setFormErrors) => {
  const newTitle = e.target.value;
  setTitle(newTitle);
  setFormErrors((prev) => ({
    ...prev,
    title: !titleRegex.test(newTitle) ? "Please enter a valid title." : "",
  }));
};
export const checkDetails = (e, setDetails, setFormErrors) => {
  const details = e.target.value;
  setDetails(details);
  setFormErrors((prev) => ({
    ...prev,
    details: !detailsRegex.test(details) ? "Please enter a valid details." : "",
  }));
};
export const checkStartDate = (
  e,
  selectedStatus,
  setStartDate,
  setFormErrors
) => {
  const newDate = e.target.value;
  setStartDate(newDate);
  setFormErrors((prev) => ({
    ...prev,
    startDate:
      selectedStatus === "To Do" && new Date(newDate).getTime() < Date.now()
        ? "to do date have to be in the future"
        : "",
  }));

  // !startTimeRegex.test(newTime)
  //     ? "Please enter a valid start Time."
  //     :
};

export const checkCreateTask = async (
  e,
  formErrors,
  setFormErrors,
  dispatch,
  Navigate,
  message,
  taskData
) => {
  e.preventDefault();
  if (taskData.title && taskData.startDate) {
    if (!formErrors.title && !formErrors.details && !formErrors.startDate) {
      try {
        await createTaskService(taskData, Navigate);
      } catch (err) {
        catchGlobalError(setFormErrors, err, message, dispatch);
      }
    }
  } else {
    emptyFildsError(setFormErrors);
  }
};

export const checkUpdateTask = async (
  e,
  formErrors,
  setFormErrors,
  dispatch,
  Navigate,
  message,
  taskData
) => {
  e.preventDefault();
  if (
    !formErrors.title &&
    !formErrors.details &&
    !formErrors.startDate &&
    !formErrors.checkSendEmail
  ) {
    try {
      await updateTaskService(taskData, Navigate);
    } catch (err) {
      catchGlobalError(setFormErrors, err, message, dispatch);
    }
  }
};

export const deleteTaskCheck = async (
  e,
  setFormErrors,
  dispatch,
  Navigate,
  message,
  taskData
) => {
  e.preventDefault();
  try {
    await deleteTaskService(taskData, Navigate);
  } catch (err) {
    catchGlobalError(setFormErrors, err, message, dispatch);
  }
};
