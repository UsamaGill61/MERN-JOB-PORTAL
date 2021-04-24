import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

toast.configure();

const Alert = () => {
  const [succesfullAlert, setsuccesfullAlert] = useState(false);
  const jobPosting = useSelector((state) => state.jobPosting);

  useEffect(() => {
    if (jobPosting.COMPLETE_YOUR_PROFILE_ERROR !== "") setsuccesfullAlert(true);
    if (jobPosting.COMPLETE_YOUR_PROFILE_ERROR === "") setsuccesfullAlert(false);

  }, [jobPosting.COMPLETE_YOUR_PROFILE_ERROR]);
  const notify = () =>
    toast.info(`${jobPosting.COMPLETE_YOUR_PROFILE_ERROR}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      // onClose: () => dispatch(emptyErrorFiildsAfterSignUp()),
    });

  toast.clearWaitingQueue();

  if (succesfullAlert) notify();
  return (
    <div>
      <ToastContainer limit={1} />
    </div>
  );
};

export default Alert;
