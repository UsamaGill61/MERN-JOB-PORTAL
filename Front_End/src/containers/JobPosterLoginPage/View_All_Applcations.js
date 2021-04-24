import React, { useEffect, useState } from "react";
import { getJobsDetail,getSingleUserDetail } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const View_All_Applcations = (props) => {
  const dispatch = useDispatch();
  const jobPosting = useSelector((state) => state.jobPosting);
  let auth = useSelector((state) => state.auth);
  const [appliedCanidates, setappliedCanidates] = useState([]);

  useEffect(() => {
    const { Applicants } = props.match.params;
    const payload = {
      params: {
        jobid: Applicants,
      },
    };
    dispatch(getJobsDetail(payload));
  }, []);
  useEffect(() => { 
    setappliedCanidates(jobPosting.SingleJobDetail.AppliedCanidates);
  }, [jobPosting.SingleJobDetail.AppliedCanidates]);

  return ( 
    <div className="container">
      <div className="row mx-5 p-3">
        <div className="col-4">No of Users Applied</div>
        <div className="col-6">Check User Profile</div>
      </div>
      {appliedCanidates
        ? appliedCanidates.map((user, index) => (
            <div key={index} className="row mx-5 p-3">
              <div className="col-4">{index + 1}</div>
              <div className="col-6">
                <Link
                  className="btn btn-primary "
                  to={`/user/completeProfile`}
                  onClick={()=>dispatch(getSingleUserDetail(user.AppliedUserId))}
                >
                  View Complete Profile
                </Link>
              </div>
            </div>
          ))
        : null}
    </div>
  );
};

export default View_All_Applcations;
