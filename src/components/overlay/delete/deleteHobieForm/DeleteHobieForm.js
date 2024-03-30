import React, { useState } from "react";
import OverlayCloseBtn from "../../overlayCloseBtn/OverlayCloseBtn";
import { deleteHobieCheck } from "../../../../utils/formValidators/hobieFormValidators";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const DeleteHobieForm = () => {
  const token = useSelector((state) => state.auth.user.token);
  const { id } = useParams();
  const Navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const dispatch = useDispatch();

  const handleDelete = (e) => {
    deleteHobieCheck(e, setFormErrors, Navigate, dispatch, "", {
      token,
      id,
    });
  };

  return (
    <form>
      <OverlayCloseBtn />
      <h1 className="wrn-message">delete hobie</h1>

      <span className="sub-title">
        are you sure you want to delete this hobie?
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

export default DeleteHobieForm;
