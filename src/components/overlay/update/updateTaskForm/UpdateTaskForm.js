import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCloudArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck as regFaCircleCheck } from "@fortawesome/free-regular-svg-icons";
import OverlayCloseBtn from "../../overlayCloseBtn/OverlayCloseBtn";
import {
  checkTitle,
  checkDetails,
  checkStartDate,
  checkUpdateTask,
  checkUpdateTaskStatus,
} from "../../../../utils/formValidators/taskFormValidators";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getTaskData } from "../../../../utils/services/taskServices";
const UpdateTaskForm = () => {
  const token = useSelector((state) => state.auth.user.token);
  const { id } = useParams();
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("To Do");
  const [startDate, setStartDate] = useState("");
  const [checkSendEmail, setCheckSendEmail] = useState(false);
  const [image, setImage] = useState(null);

  const [formErrors, setFormErrors] = useState({});
  //
  const message =
    "Oops! It seems like the email is used. Please double-check and try again.";
  //

  useEffect(() => {
    const fetchTask = async () => {
      const taskData = await getTaskData(Navigate, id, token);
      setTitle(taskData.data.data.title);
      setDetails(taskData.data.data.details);
      setSelectedStatus(taskData.data.data.status);
      setStartDate(taskData.data.data.startDate.slice(0, 19));
      setCheckSendEmail(taskData.data.data.checkSendEmail);
    };
    fetchTask();
  }, []);
  const handleUpdate = (e) => {
    checkUpdateTask(e, formErrors, setFormErrors, dispatch, Navigate, message, {
      token,
      title,
      details,
      status: selectedStatus,
      startDate,
      checkSendEmail,
      image,
      id,
    });
  };
  return (
    <form>
      <OverlayCloseBtn />
      <h1>update task</h1>
      <span className="sub-title">tackle your goals in daily doses</span>
      <label htmlFor="task-title">task title :</label>
      <input
        type="text"
        placeholder="Title*"
        id="task-title"
        value={title}
        onChange={(e) => checkTitle(e, setTitle, setFormErrors)}
      />
      {formErrors.title && (
        <span className="error-message">{formErrors.title}</span>
      )}

      <label htmlFor="task-details">task details :</label>
      <textarea
        maxLength={256}
        className="task-details"
        placeholder="Task Description"
        id="task-details"
        value={details}
        onChange={(e) => checkDetails(e, setDetails, setFormErrors)}
      ></textarea>
      {formErrors.details && (
        <span className="error-message">{formErrors.details}</span>
      )}

      <div className="select-status-box">
        <span>status :</span>
        {["To Do", "In Progress", "Done"].map((e, i) => {
          return (
            <div
              className={`status ${selectedStatus === e && "selected-status"}`}
              key={i}
              onClick={() => {
                checkUpdateTaskStatus(
                  e,
                  setSelectedStatus,
                  startDate,
                  setFormErrors
                );
              }}
            >
              {e}
            </div>
          );
        })}
      </div>
      {formErrors.updateTaskStatus && (
        <span className="error-message">{formErrors.updateTaskStatus}</span>
      )}
      <label htmlFor="task-date">start date :</label>
      <input
        type="datetime-local"
        name=""
        id="task-date"
        value={startDate}
        onChange={(e) =>
          checkStartDate(e, selectedStatus, setStartDate, setFormErrors)
        }
      />
      {formErrors.startDate && (
        <span className="error-message">{formErrors.startDate}</span>
      )}
      <div className="send-email-box">
        <span className="send-email-txt">send email in time?</span>
        <FontAwesomeIcon
          icon={checkSendEmail ? faCircleCheck : regFaCircleCheck}
          className="icon"
          onClick={() => setCheckSendEmail((prev) => !prev)}
        />
      </div>

      <label htmlFor="task-img">task image :</label>
      <div className="image-box">
        <input
          type="file"
          id="task-img"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <FontAwesomeIcon icon={faCloudArrowUp} className="icon" />
        <span className="image-txt">
          {!image
            ? "no file chosen"
            : image.name.length >= 10
            ? "..." + image.name.slice(-10)
            : image.name}
        </span>
      </div>
      {formErrors.access && (
        <span className="error-message">{formErrors.access}</span>
      )}
      <div className="form-btns">
        <button className="btn" onClick={handleUpdate}>
          update
        </button>
        {/* <Link to="/home"> */}
        <button
          className="btn wrn-message"
          onClick={() => {
            Navigate("/home");
          }}
        >
          <span>cancel</span>
        </button>
        {/* </Link> */}
      </div>
    </form>
  );
};

export default UpdateTaskForm;
