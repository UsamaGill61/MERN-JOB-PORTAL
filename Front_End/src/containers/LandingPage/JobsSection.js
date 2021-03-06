import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllJobsInitially } from "../../actions";
import moment from "moment";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

const JobsSection = () => {
  const dispatch = useDispatch();
  const initialData = useSelector((state) => state.initialData);
  let auth = useSelector((state) => state.auth);

  const [pageNumber, setPageNumber] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0); 
  const [QueryWord, setQueryWord] = useState("");
  // console.log(QueryWord)

  useEffect(() => {
    if (!auth.authenticate || auth.user.role == "Applicant") {
      dispatch(getAllJobsInitially({ pageNumber, QueryWord }));
    }
  }, [pageNumber, QueryWord, auth.user.role]);

  useEffect(() => {
    if (!auth.authenticate || auth.user.role == "Applicant") {
      setNumberOfPages(initialData.totalPages);
    }
  }, [initialData.totalPages, auth.user.role]);

  const pages = new Array(numberOfPages).fill(null).map((v, i) => i);

  const gotoPrevious = () => {
    setPageNumber(Math.max(0, pageNumber - 1));
  };

  const gotoNext = () => {
    setPageNumber(Math.min(numberOfPages - 1, pageNumber + 1));
  };

  return ( 
    <>
      <div className="container-fluid mx-0 px-0" style={{ backgroundColor: "#F4F4F4" }}>
        <div className="row text-center mx-5 p-3">
          <div className="col-12">
            <h1 className="text-success Search_text_section">Search & Apply Online on All Jobs</h1>
          </div>
        </div>
        <div className="row text-center mx-md-5 p-3">
          <div className="col-0 col-xl-3 "></div>
          <div className="col-12 col-xl-8 ">
            <SearchBar setQueryWord={setQueryWord} />
          </div>
        </div>
        <div className="row mx-5 p-3">
          <div className="col-md-5">
            <h2 className="Search_text_section">Recent Jobs Posted</h2>
          </div>
          <div className="offset-md-4 align-self-end"></div>
        </div>

        <div
          className="row Hide-Job-Section_row p-2 border border-secondary mx-1 mx-sm-0 mx-md-5"
          style={{ backgroundColor: "#CBCBCB" }}
        >
          <div className="col-2">Title</div>
          <div className="col-2">Company</div>
          <div className="col-2">Role</div>
          <div className="col-2">Last Day To Apply</div>
          <div className="col-2">Monthly Salery</div>

          <div className="col-2">See Details</div>
        </div>
        {initialData.initialJobs.length > 0 ? (
          <div>
            {initialData.initialJobs.map((job, index) => (
              <div
                key={index}
                className="row p-2 border-top-0 border border-secondary bg-light mx-1 mx-sm-0 mx-md-5"
              >
                <div className="col-6 col-md-2 pt-2">{job.title}</div>
                <div className="col-6 col-md-2 pt-2">{job.companyName}</div>
                <div className="col-6 col-md-2 pt-2">{job.Role}</div>
                <div className="col-6 col-md-2 pt-2">
                  {moment(job.lastDateToApply).calendar()}
                </div>
                <div className="col-6 col-md-2">{job.monthlySalery} (Rs)</div>
                <div className="col-6 col-md-2">
                  {auth.authenticate ? (
                    <Link className="btn btn-primary " to={`/${job._id}`}>
                      View Detail
                    </Link>
                  ) : (
                    <button className="btn btn-primary" style={{cursor:"no-drop"}} disabled>
                      Login To Continue
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="row text-center row p-2 border-top-0 border border-secondary bg-light mx-5">
            <div className="col-12 p-4">No Jobs Found...</div>
          </div>
        )}
      </div>
      <div
        className="container-fluid pb-5 pt-5"
        style={{ backgroundColor: "#F4F4F4" }}
      >
        <div className="row">
          <div className="col-12 text-center">
            {initialData.totalPages > 0 && (
              <div
              className="bottom_navigation"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <button className="btn btn-dark mr-2" onClick={gotoPrevious}>
                  Previous
                </button>
                {pages.map((pageIndex) => (
                  <div key={pageIndex}>
                    <button
                      className={
                        pageNumber === pageIndex
                          ? "btn btn-dark mx-2"
                          : "btn btn-info mx-2"
                      }
                      onClick={() => setPageNumber(pageIndex)}
                    >
                      {pageIndex + 1}
                    </button>
                  </div>
                ))}
                <button className="btn btn-dark ml-2" onClick={gotoNext}>
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default JobsSection;
