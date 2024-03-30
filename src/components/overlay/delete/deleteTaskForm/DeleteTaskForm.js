import React, { useState } from "react";
import OverlayCloseBtn from "../../overlayCloseBtn/OverlayCloseBtn";

import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteTaskCheck } from "../../../../utils/formValidators/taskFormValidators";

const DeleteTaskForm = () => {
  const token = useSelector((state) => state.auth.user.token);
  const { id } = useParams();
  const Navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const dispatch = useDispatch();

  const handleDelete = (e) => {
    deleteTaskCheck(e, setFormErrors, dispatch, Navigate, "", {
      token,
      id,
    });
  };
  return (
    <form>
      <OverlayCloseBtn />
      <h1 className="wrn-message">delete task</h1>

      <span className="sub-title">
        are you sure you want to delete this task?
      </span>
      {formErrors.access && (
        <span className="error-message">{formErrors.access}</span>
      )}
      <div className="form-btns">
        <button className="btn wrn-btn" onClick={handleDelete}>
          delete
        </button>
        <Link to="/home">
          <button className="btn wrn-message">
            <span>cancel</span>
          </button>
        </Link>
      </div>
    </form>
  );
};

export default DeleteTaskForm;
