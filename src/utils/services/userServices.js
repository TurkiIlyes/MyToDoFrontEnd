import axios from "axios";
import {
  logIn,
  logOut,
  resetPassword,
  signUp,
} from "../../redux/slice/AuthSlice";

export const deleteAccountService = async (userData, dispatch) => {
  const data = await axios.delete(
    `${process.env.REACT_APP_API_URI}/user/${userData.id}`,
    {
      data: {
        password: userData.password,
      },
      headers: { Authorization: userData.token },
    }
  );
  if (data.status === 200) {
    dispatch(logOut());
  }
};

export const updateImageService = async (userData, dispatch, Navigate) => {
  const formData = new FormData();
  formData.append("image", userData.image);
  console.log("check data :", userData);
  const data = await axios.put(
    `${process.env.REACT_APP_API_URI}/user/`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: userData.token,
      },
    }
  );
  if (data.status === 201) {
    dispatch(logIn(data.data));
    Navigate("/home");
  }
};

export const UpdateUserInfoService = async (userData, dispatch, Navigate) => {
  const data = await axios.put(
    `${process.env.REACT_APP_API_URI}/user/`,
    {
      name: userData.fullName,
    },
    { headers: { Authorization: userData.token } }
  );
  if (data.status === 201) {
    dispatch(logIn(data.data));
    Navigate("/home");
  }
};
export const updatePasswordService = async (userData, dispatch, Navigate) => {
  console.log(userData);
  const data = await axios.put(
    `${process.env.REACT_APP_API_URI}/user/updatepassword`,
    {
      oldPassword: userData.oldPassword,
      newPassword: userData.newPassword,
      confirmNewPassword: userData.confirmNewPassword,
    },
    { headers: { Authorization: userData.token } }
  );
  if (data.status === 201) {
    dispatch(logIn(data.data));
    Navigate("/home");
  }
};

export const signInService = async (userData, dispatch, Navigate) => {
  const data = await axios.post(
    `${process.env.REACT_APP_API_URI}/user/signin`,
    {
      ...userData,
    }
  );
  if (data.status === 200) {
    dispatch(logIn(data.data));
    Navigate("/home");
  }
};

export const forgetPasswordService = async (userData, dispatch, Navigate) => {
  const data = await axios.post(
    `${process.env.REACT_APP_API_URI}/user/forgetpassword`,
    {
      email: userData.email,
    }
  );
  if (data.status === 200) {
    dispatch(
      resetPassword({
        resetPwObj: {
          forgetPwReq: true,
          checkPwReset: false,
          email: userData.email,
        },
      })
    );
    Navigate("/checkresetcode");
  }
};

export const changePasswordService = async (userData, dispatch, Navigate) => {
  const data = await axios.put(
    `${process.env.REACT_APP_API_URI}/user/resetPassword`,
    {
      email: userData.resetPwObj.email,
      password: userData.password,
      passwordconfirm: userData.confirmPw,
    }
  );
  if (data.status === 200) {
    dispatch(
      resetPassword({
        resetPwObj: {},
        user: data.data,
        isAuthenticated: true,
      })
    );
    Navigate("/home");
  }
};

export const resetCodeService = async (userData, dispatch, Navigate) => {
  const data = await axios.post(
    `${process.env.REACT_APP_API_URI}/user/verifyPwResetCode`,
    {
      resetcode: userData.code,
      email: userData.resetPwObj.email,
    }
  );
  if (data.status === 200) {
    dispatch(
      resetPassword({
        resetPwObj: { ...userData.resetPwObj, checkPwReset: true },
      })
    );
    Navigate("/changepassword");
  }
};

export const signUpService = async (userData, dispatch, Navigate) => {
  const formData = new FormData();
  formData.append("name", userData.fullName);
  formData.append("email", userData.email);
  formData.append("password", userData.password);
  formData.append("passwordconfirm", userData.confirmPw);
  formData.append("image", userData.image);
  const data = await axios.post(
    `${process.env.REACT_APP_API_URI}/user/signup`,
    formData
  );
  if (data.status === 201) {
    dispatch(
      signUp({
        signUpVerifyObj: {
          signUpVerifyAccess: true,
          email: data.data.data.email,
        },
      })
    );
    Navigate("/checkcode");
  }
};

export const signUpCodeService = async (userData, dispatch, Navigate) => {
  const data = await axios.post(
    `${process.env.REACT_APP_API_URI}/user/verifySignUpCode`,
    {
      signUpCode: userData.code,
      email: userData.signUpVerifyObj.email,
    }
  );
  if (data.status === 201) {
    dispatch(
      signUp({
        signUpVerifyObj: {},
        user: data.data,
        isAuthenticated: true,
      })
    );
    Navigate("/home");
  }
};
