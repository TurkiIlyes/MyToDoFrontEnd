import axios from "axios";
import moment from "moment-timezone";
import { logOut } from "../../redux/slice/AuthSlice";

const getTaskStartDate = (task) => {
  const startDate = moment(task.startDate).tz("Africa/Tunis");

  const now = moment().tz("Africa/Tunis");
  const timeDifference = Math.abs(startDate.toDate() - now.toDate());

  const units = [
    { value: 365 * 24 * 60 * 60 * 1000, label: "Y" },
    { value: 30 * 24 * 60 * 60 * 1000, label: "M" },
    { value: 24 * 60 * 60 * 1000, label: "D" },
    { value: 60 * 60 * 1000, label: "H" },
    { value: 60 * 1000, label: "m" },
    { value: 1000, label: "s" },
  ];

  const nonZeroUnit = units.find((unit) => timeDifference >= unit.value);
  return `${Math.floor(timeDifference / nonZeroUnit.value)}${
    nonZeroUnit.label
  }`;
};

// const getTaskStartDate = (task) => {
//   console.log(new Date(task.startDate).getTime() - Date.now());
//   const stDate = new Date(task.startDate).getTime() - Date.now();
//   const elements = ["Y", "M", "D", "H", "m", "s"];
//   const values = [
//     stDate.getFullYear(),
//     stDate.getMonth() + 1,
//     stDate.getDate(),
//     stDate.getHours(),
//     stDate.getMinutes(),
//     stDate.getSeconds(),
//   ];
//   const i = values.findIndex((e) => !isNaN(e));
//   return `${values[i]}${elements[i]}`;
// };
export const getStatus = (task) => {
  return task.status !== "To Do" ? task.status : getTaskStartDate(task);
};

export const getLteGteDate = (date, gte = 0, lte = 0) => {
  const gteDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + gte
  );
  const lteDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + lte
  );
  return { gteDate, lteDate };
};

export const getDateName = (date) => {
  const todayDate = new Date();
  return date.getFullYear() === todayDate.getFullYear() &&
    date.getMonth() === todayDate.getMonth() &&
    date.getDate() === todayDate.getDate()
    ? "today"
    : date.toDateString();
};

export const getTaskData = async (Navigate, taskId, token) => {
  try {
    const taskData = await axios.get(
      `${process.env.REACT_APP_API_URI}/tasks/${taskId}`,
      {
        headers: { Authorization: token },
      }
    );
    if (taskData.status === 200) {
      return taskData;
    }
  } catch (err) {
    Navigate("/home");
  }
};

export const getSpecTasks = async (dispatch, Navigate, taskData) => {
  try {
    const data = await axios.get(
      `${process.env.REACT_APP_API_URI}/tasks/?${
        taskData.q ? "q=" + taskData.q : ""
      }`,
      {
        headers: { Authorization: taskData.token },
      }
    );
    if (data.status === 200) {
      return data.data;
    }
  } catch (err) {
    if (err.response.status === 401) {
      dispatch(logOut());
    }
    Navigate("/home");
  }
};

export const getSelectedDateTasks = async (dispatch, Navigate, taskData) => {
  try {
    const data = await axios.get(
      `${process.env.REACT_APP_API_URI}/tasks?startDate[gte]=${taskData.gte}&startDate[lte]=${taskData.lte}`,
      {
        headers: { Authorization: taskData.token },
      }
    );
    if (data.status === 200) {
      return data.data;
    }
  } catch (err) {
    if (err.response.status === 401) {
      dispatch(logOut());
    }
    Navigate("/home");
  }
};

export const createTaskService = async (taskData, Navigate) => {
  const formData = new FormData();
  formData.append("title", taskData.title);
  formData.append("details", taskData.details);
  formData.append("status", taskData.status);
  formData.append("startDate", taskData.startDate);
  formData.append("checkSendEmail", taskData.checkSendEmail);
  formData.append("image", taskData.image);
  await axios.post(`${process.env.REACT_APP_API_URI}/tasks/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: taskData.token,
    },
  });
  Navigate("/home");
};
export const updateTaskService = async (taskData, Navigate) => {
  const formData = new FormData();
  formData.append("title", taskData.title);
  formData.append("details", taskData.details);
  formData.append("startDate", taskData.startDate);
  formData.append("checkSendEmail", taskData.checkSendEmail);
  formData.append("image", taskData.image);
  await axios.put(
    `${process.env.REACT_APP_API_URI}/tasks/${taskData.id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: taskData.token,
      },
    }
  );
  Navigate("/home");
};
export const deleteTaskService = async (taskData, Navigate) => {
  await axios.delete(`${process.env.REACT_APP_API_URI}/tasks/${taskData.id}`, {
    headers: { Authorization: taskData.token },
  });
  Navigate("/home");
};
