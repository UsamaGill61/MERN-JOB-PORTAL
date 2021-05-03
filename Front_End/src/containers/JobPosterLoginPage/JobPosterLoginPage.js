import React, { useEffect, useState } from "react";
import PostJobModel from "./PostJobModel";
import { getJobsPostedBySingleUser } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";
import './GenralCss.css'

const JobPosterLoginPage = () => {
  const dispatch = useDispatch();
  const jobPosting = useSelector((state) => state.jobPosting);
  let auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth.authenticate && auth.user.role === "Poster") {
      dispatch(getJobsPostedBySingleUser());
    }
  }, []);
  const [postJobModel, setpostJobModel] = useState(false);
  return (
    <div className="container-fluid">
      <div className="row mx-md-5 p-2 p-lg-3">
        <div className="col-12 col-md-6">
          <h2>Total Jobs Posted <span className="text-info">{jobPosting.Jobs.length}</span></h2>
        </div>
        <div className="col-12 col-md-6 text-right">
          <button
            className="btn btn-primary"
            onClick={() => setpostJobModel(true)}
          >
            Post A new Job
          </button> 
        </div>
      </div>
      <div className="row mx-md-5 p-2 p-md-3">
        <div className="col-12 col-md-6 ">
          <h2>Your Posted Jobs</h2>
        </div>
      </div>
      <div 
        className="row p-2 border border-secondary Hide-row-css mx-lg-5"
        style={{ backgroundColor: "#CBCBCB" }}
      >
        <div className="col-2">Title</div>
        <div className="col-2">Company</div>
        <div className="col-2">Role</div>
        <div className="col-2">Last Day To Apply</div>
        <div className="col-4"></div>
      </div>
      {jobPosting.Jobs.length > 0 ? (
        <div>
          {jobPosting.Jobs.map((job, index) => (
            <div
              key={index}
              className="row p-2 border-top-0 border border-secondary bg-light mx-lg-5"
            >
              <div className="col-6 col-sm-4 col-md-2 pt-2">{job.title}</div>
              <div className="col-6 col-sm-4 col-md-2 pt-2">{job.companyName}</div>
              <div className="col-6 col-sm-4 col-md-2 pt-2">{job.Role}</div>
              <div className="col-6 col-sm-4 col-md-2 pt-2">
                {moment(job.lastDateToApply).calendar()}
              </div>
              <div className="col-6 col-sm-4 col-md-2">
                <Link className="btn btn-primary " to={`/${job._id}`}>
                  View Detail
                </Link>
              </div>
              <div className="col-6 col-sm-4 col-md-2">
                <Link
                  className="btn btn-primary "
                  to={`/${job._id}/jobAppliedCandidates`}
                >
                  View Applications
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="row text-center row p-2 border-top-0 border border-secondary bg-light mx-5">
          <div className="col-12">No Jobs Posted Yet</div>
        </div>
      )}

      <PostJobModel
        postJobModel={postJobModel}
        setpostJobModel={setpostJobModel}
      />
    </div>
  );
};

export default JobPosterLoginPage;
