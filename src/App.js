import "./App.css";
import Sign from "./pages/sign/Sign";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SignUpForm from "./components/auth/authForms/signUpForm/SignUpForm";
import SignInForm from "./components/auth/authForms/signInForm/SignInForm";
import ForgetPasswordForm from "./components/auth/authForms/forgetPasswordForm/ForgetPasswordForm";
import CheckResetCodeForm from "./components/auth/authForms/checkResetCodeForm/CheckResetCodeForm";
import ChangePasswordForm from "./components/auth/authForms/changePasswordForm/ChangePasswordForm";
import CheckSignUpCodeForm from "./components/auth/authForms/checkSignUpCodeForm/CheckSignUpCodeForm";

import ProtectedRoute from "./components/auth/protectedRoutes/ProtectedRoute";
import ProtectSignUpVerifyRoute from "./components/auth/protectedRoutes/ProtectSignUpVerifyRoute";
import {
  ProtectCheckPwResetRoute,
  ProtectForgetPwRoute,
} from "./components/auth/protectedRoutes/ProtectPwChangeRoutes";

import HidenRoutes from "./components/auth/hidenRoutes/HidenRoutes";

import Home from "./pages/home/Home";
import Header from "./components/header/Header";
import Overlay from "./components/overlay/Overlay";
import UpdatePasswordForm from "./components/overlay/update/updatePasswordForm/UpdatePasswordForm";
import UpdateHobieForm from "./components/overlay/update/updateHobieForm/UpdateHobieForm";
import CreateTaskForm from "./components/overlay/create/createTaskForm/CreateTaskForm";
import CreateHobieForm from "./components/overlay/create/createHobieForm/CreateHobieForm";
import UpdateUserInfo from "./components/overlay/update/updateUserInfo/UpdateUserInfo";
import UpdatePhoto from "./components/overlay/update/updatePhoto/UpdatePhoto";
import DeleteAccountForm from "./components/overlay/delete/deleteAccountForm/DeleteAccountForm";
import ShowHobieForm from "./components/overlay/show/showHobieForm/ShowHobieForm";
import DeleteHobieForm from "./components/overlay/delete/deleteHobieForm/DeleteHobieForm";
import UpdateTaskForm from "./components/overlay/update/updateTaskForm/UpdateTaskForm";
import ShowTaskForm from "./components/overlay/show/showTaskForm/ShowTaskForm";
import DeleteTaskForm from "./components/overlay/delete/deleteTaskForm/DeleteTaskForm";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index element={<Navigate to="signin" replace />} />
          <Route element={<HidenRoutes />}>
            <Route path="/" element={<Sign />}>
              <Route path="signin" element={<SignInForm />} />
              <Route path="signup" element={<SignUpForm />} />
              <Route path="forgetpassword" element={<ForgetPasswordForm />} />
              <Route element={<ProtectForgetPwRoute />}>
                <Route path="checkresetcode" element={<CheckResetCodeForm />} />
              </Route>
              <Route element={<ProtectCheckPwResetRoute />}>
                <Route path="changepassword" element={<ChangePasswordForm />} />
              </Route>
              <Route element={<ProtectSignUpVerifyRoute />}>
                <Route path="checkcode" element={<CheckSignUpCodeForm />} />
              </Route>
            </Route>
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Home />}>
              <Route element={<Overlay />}>
                <Route path="updateinfo" element={<UpdateUserInfo />} />
                <Route path="updateimage" element={<UpdatePhoto />} />
                <Route path="updatepassword" element={<UpdatePasswordForm />} />
                <Route path="deleteaccount" element={<DeleteAccountForm />} />

                <Route path="createhobie" element={<CreateHobieForm />} />
                <Route path="updatehobie/:id" element={<UpdateHobieForm />} />
                <Route path="showhobie/:id" element={<ShowHobieForm />} />
                <Route path="deletehobie/:id" element={<DeleteHobieForm />} />

                <Route path="createtask" element={<CreateTaskForm />} />
                <Route path="updatetask/:id" element={<UpdateTaskForm />} />
                <Route path="showtask/:id" element={<ShowTaskForm />} />
                <Route path="deletetask/:id" element={<DeleteTaskForm />} />
              </Route>
            </Route>
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
