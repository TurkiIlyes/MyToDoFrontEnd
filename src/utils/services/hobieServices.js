import axios from "axios";
import { logOut } from "../../redux/slice/AuthSlice";

export const getHobies = async (dispatch, Navigate, hobieData) => {
  try {
    const hobies = await axios.get(`${process.env.REACT_APP_API_URI}/hobies/`, {
      headers: { Authorization: hobieData.token },
    });

    if (hobies.status === 200) {
      return hobies.data;
    }
  } catch (err) {
    if (err.response.status === 401) {
      dispatch(logOut());
    }
    Navigate("/home");
  }
};

export const getHobieData = async (Navigate, HobieId, token) => {
  try {
    const hobieData = await axios.get(
      `${process.env.REACT_APP_API_URI}/hobies/${HobieId}`,
      {
        headers: { Authorization: token },
      }
    );
    if (hobieData.status === 200) {
      return hobieData;
    }
  } catch (err) {
    Navigate("/home");
  }
};

export const createHobieService = async (hobieData, Navigate) => {
  const formData = new FormData();
  formData.append("title", hobieData.title);
  formData.append("startTime", hobieData.startTime);
  formData.append("endTime", hobieData.endTime);
  formData.append("image", hobieData.image);
  await axios.post(`${process.env.REACT_APP_API_URI}/hobies/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: hobieData.token,
    },
  });

  Navigate("/home");
};
export const updateHobieService = async (hobieData, Navigate) => {
  const formData = new FormData();
  formData.append("title", hobieData.title);
  formData.append("startTime", hobieData.startTime);
  formData.append("endTime", hobieData.endTime);
  formData.append("image", hobieData.image);
  await axios.put(
    `${process.env.REACT_APP_API_URI}/hobies/${hobieData.id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: hobieData.token,
      },
    }
  );
  Navigate("/home");
};
export const deleteHobieService = async (hobieData, Navigate) => {
  console.log(hobieData);
  await axios.delete(
    `${process.env.REACT_APP_API_URI}/hobies/${hobieData.id}`,
    {
      headers: { Authorization: hobieData.token },
    }
  );
  Navigate("/home");
};
