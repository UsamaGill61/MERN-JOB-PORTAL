import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getJobsDetail,
  ApplyToTheJob,
  getAllJobsInitially,
  ResetRoute,
} from "../../actions";
import moment from "moment";

const JobDetailPage = (props) => {
  // console.log(`'hloooooooo ${props.match.params.jobid}`);
  const dispatch = useDispatch();
  const [SingleJobDetail, setSingleJobDetail] = useState({});
  const [ShowButton, setShowButton] = useState(false);
  let auth = useSelector((state) => state.auth); 
  const initialData = useSelector((state) => state.initialData);
  const jobPosting = useSelector(state => state.jobPosting)
  console.log(jobPosting.COMPLETE_YOUR_PROFILE_ERROR)

  const showApplyButton = () => {};
  useEffect(() => {
    if (jobPosting.SingleJobDetail.AppliedCanidates)
      jobPosting.SingleJobDetail.AppliedCanidates.map((e) => {
        var n = e.AppliedUserId.localeCompare(auth.user._id);
        if (n === 0) setShowButton(true);
      });
  }, [jobPosting.SingleJobDetail]);

  useEffect(() => {
    const { jobid } = props.match.params;
    const payload = {
      params: {
        jobid,
      },
    };
    dispatch(getJobsDetail(payload));
  }, []);

  useEffect(() => {
    setSingleJobDetail(jobPosting.SingleJobDetail);
  }, [jobPosting.SingleJobDetail]);
  useEffect(() => {
    if (initialData.setingJobDetailtoNull) dispatch(ResetRoute());
  }, [initialData.setingJobDetailtoNull]);

  const applyTojobMethod = () => {
    const { jobid } = props.match.params;
    const payload = {
      params: { 
        jobid, 
      },
    };
    dispatch(getJobsDetail(payload));
    dispatch(ApplyToTheJob(jobid)).then(() => dispatch(getJobsDetail(payload)));
  };

  if (SingleJobDetail.requiredSkills) {
    return (
      <div>
        <div className="container-fluid">
          {showApplyButton()}
          <div className="row pt-2 text-right">
            <div className="col-11">
              {ShowButton ? (
                <button disabled className="btn btn-info">
                  You Have Already Applied To this job
                </button>
              ) : (
                <button className="btn btn-primary" onClick={applyTojobMethod}>
                  Apply To this Job
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row m-5 border border-secondary ">
            {/* ...................................Left Side........................... */}
            <div
              className="col-5 bg-light border border-info"
              style={{ backgroundColor: "#CBCBCB" }}
            >
              <div className="row px-3 pt-3  text-danger  font-weight-bold">
                Job Details
              </div>
              <div>
                <hr
                  className="mt-1"
                  style={{ borderTop: "1px solid #222222" }}
                />
              </div>
              <div className="row px-3 pt-3  ">
                <div className="col-5">Location</div>
                <div className="col-6 text-uppercase font-weight-bold ">
                  {SingleJobDetail.location}
                </div>
              </div>
              <div className="row px-3 pt-3  ">
                <div className="col-5">Industry</div>
                <div className="col-6 text-uppercase font-weight-bold">
                  {SingleJobDetail.companyName}
                </div>
              </div>
              <div className="row px-3 pt-3  ">
                <div className="col-5">Total Positions</div>
                <div className="col-6 text-uppercase font-weight-bold">
                  {SingleJobDetail.TotalPositions}
                </div>
              </div>
              <div className="row px-3 pt-3  ">
                <div className="col-5">Employment Status</div>
                <div className="col-6 text-uppercase font-weight-bold">
                  {SingleJobDetail.employmentStatus}
                </div>
              </div>
              <div className="row px-3 pt-3  ">
                <div className="col-5">Role</div>
                <div className="col-6 text-uppercase font-weight-bold">
                  {SingleJobDetail.Role}
                </div>
              </div>
              <div className="row px-3 pt-3  ">
                <div className="col-5">Monthly Salery</div>
                <div className="col-6  font-weight-bold">
                  {SingleJobDetail.monthlySalery} (Rs)
                </div>
              </div>
              <div className="row px-3 pt-3  ">
                <div className="col-5">last Date To Apply</div>
                <div className="col-6 text-uppercase font-weight-bold">
                  {moment(SingleJobDetail.lastDateToApply).calendar()}
                </div>
              </div>

              <div>
                <hr
                  className="mt-3"
                  style={{ borderTop: "1px solid #222222" }}
                />
              </div>
              <div className="row px-3 pt-1 text-danger  font-weight-bold">
                Preferred Candidates
              </div>
              <div className="row px-3 pt-2  ">
                <div className="col-5">Years of Experience</div>
                <div className="col-6 text-uppercase font-weight-bold">
                  {SingleJobDetail.experienceRequired} Years
                </div>
              </div>
              <div className="row px-3 pt-2  ">
                <div className="col-5">Gender</div>
                <div className="col-6 text-uppercase font-weight-bold">
                  {SingleJobDetail.Gender}
                </div>
              </div>
              <div className="row px-3 pt-2  ">
                <div className="col-5">Age</div>
                <div className="col-6 text-uppercase font-weight-bold">
                  {SingleJobDetail.age}
                </div>
              </div>
            </div>

            {/* ................................Right side............................ */}
            <div className="col-7 ">
              <div className="row px-3 pt-3 text-danger font-weight-bold">
                Job Title
              </div>
              <div>
                <hr
                  className="mt-1"
                  style={{ borderTop: "1px solid #222222" }}
                />
              </div>
              <div className="row px-3 ">{SingleJobDetail.title}</div>
              <div className="row px-3 pt-3 text-danger font-weight-bold">
                Job Description
              </div>
              <div>
                <hr
                  className="mt-1"
                  style={{ borderTop: "1px solid #222222" }}
                />
              </div>
              <div className="row px-3 ">{SingleJobDetail.description}</div>
              <div className="row px-3 pt-3 text-danger font-weight-bold">
                Degree Level
              </div>
              <div>
                <hr
                  className="mt-1"
                  style={{ borderTop: "1px solid #222222" }}
                />
              </div>
              <div className="row px-3 ">
                <div className="border bg-info p-2 rounded border-info">
                  {SingleJobDetail.degreeLevel}
                </div>
              </div>

              <div className="row px-3 pt-3 text-danger font-weight-bold">
                Required Skills
              </div>
              <div>
                <hr
                  className="mt-1"
                  style={{ borderTop: "1px solid #222222" }}
                />
              </div>
              <div className="row px-3 ">
                {SingleJobDetail.requiredSkills.map((e) => (
                  <div
                    key={e._id}
                    className="border mr-3 bg-info p-2 rounded border-info"
                  >
                    {e.skill}
                  </div>
                ))}
              </div>
              <div className="row px-3 pt-3 text-danger font-weight-bold">
                Required Tools
              </div>
              <div>
                <hr
                  className="mt-1"
                  style={{ borderTop: "1px solid #222222" }}
                />
              </div>
              <div className="row px-3 pb-5">
                {SingleJobDetail.requiredTools.map((e) => (
                  <div
                    key={e._id}
                    className="border mr-3 bg-info p-2 rounded border-info"
                  >
                    {e.tools}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container-fluid">
        <div className="row text-center p-5">
          <div className="col-12">
            <h1>Loading..........</h1>
          </div>
        </div>
      </div>
    );
  }
};

export default JobDetailPage;
