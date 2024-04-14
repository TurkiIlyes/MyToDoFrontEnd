import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// export const getHobies = createAsyncThunk("user/hobies", async (data) => {
//   const hobies = await axios.get(`${process.env.REACT_APP_API_URI}/hobies/`, {
//     headers: { Authorization: data.token },
//   });
//   return hobies.data;
// });
// ?${data.q ? "q=" + data.q : ""}
// export const getTasks = createAsyncThunk("user/tasks", async (data) => {
//   const tasks = await axios.get(`${process.env.REACT_APP_API_URI}/tasks/`, {
//     headers: { Authorization: data.token },
//   });
//   return tasks.data;
// });

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    user: null,
    // hobies: {
    //   results: 0,
    //   data: [],
    // },
    hobiesUpdateState: false,
    tasksUpdateState: false,
    // tasks: {
    //   results: 0,
    //   data: [],
    // },
    signUpVerifyObj: {
      signUpVerifyAccess: false,
      email: null,
    },
    resetPwObj: {
      forgetPwReq: false,
      checkPwReset: false,
      email: null,
    },
    selectedDate: Date.now(),
  },
  reducers: {
    signUp(state, action) {
      state.signUpVerifyObj = action.payload.signUpVerifyObj;
      state.user = action.payload.user;
      state.isAuthenticated = action.payload.isAuthenticated;
    },
    logIn(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logOut(state) {
      state.isAuthenticated = false;
      state.user = null;
      document.body.className = "light";
    },
    setAuthStatus(state, action) {
      state.isAuthenticated = action.payload;
    },
    resetPassword(state, action) {
      state.resetPwObj = action.payload.resetPwObj;
      state.user = action.payload.user;
      state.isAuthenticated = action.payload.isAuthenticated;
    },
    // getHobies(state, action) {
    //   state.hobies = action.payload;
    // },
    setHobiesUpdateState(state) {
      state.hobiesUpdateState = true;
    },
    resetHobiesUpdateState(state) {
      state.hobiesUpdateState = false;
    },
    setTasksUpdateState(state) {
      state.tasksUpdateState = true;
    },
    resetTasksUpdateState(state) {
      state.tasksUpdateState = false;
    },
    // getTasks(state, action) {
    //   state.tasks = action.payload;
    // },
    setSelectedDate(state, action) {
      state.selectedDate = action.payload;
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(getHobies.fulfilled, (state, action) => {
  //     state.hobies = action.payload;
  //   });
  // .addCase(getTasks.fulfilled, (state, action) => {
  //   state.tasks = action.payload;
  // });
  // },
});

export const {
  signUp,
  logIn,
  logOut,
  setAuthStatus,
  resetPassword,
  setSelectedDate,
  setHobiesUpdateState,
  resetHobiesUpdateState,
  setTasksUpdateState,
  resetTasksUpdateState,
} = AuthSlice.actions;
export default AuthSlice.reducer;
