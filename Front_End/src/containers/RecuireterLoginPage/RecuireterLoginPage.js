
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers_Search,getSingleUserDetail } from "../../actions";
import moment from "moment";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { generatePublicUrl } from "../../urlConfig";


const RecuireterLoginPage = () => {
  const dispatch = useDispatch();
  const initialData = useSelector((state) => state.initialData);
  let auth = useSelector((state) => state.auth);

  const [pageNumber, setPageNumber] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [QueryWord, setQueryWord] = useState("");
  // console.log(QueryWord)

  useEffect(() => {
    if (!auth.authenticate || auth.user.role == "Recureter") {
      dispatch(getAllUsers_Search({ pageNumber, QueryWord }));
    }
  }, [pageNumber, QueryWord, auth.user.role]);

  useEffect(() => {
    if (!auth.authenticate || auth.user.role == "Recureter") {
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
      <div className="container-fluid " style={{ backgroundColor: "#F4F4F4" }}>
        <div className="row text-center mx-5 p-3">
          <div className="col-12">
            <h2 className="text-success">Search Job Title Which You Are Looking For</h2>
          </div>
        </div>
        <div className="row text-center mx-5 p-3">
          <div className="col-3 "></div>
          <div className="col-8 ">
            <SearchBar setQueryWord={setQueryWord} />
          </div>
        </div>
        <div className="row mx-5 p-3">
          <div className="col-6">
            <h2>All Available Candidates</h2>
          </div>
          <div className="offset-md-4 align-self-end"></div>
        </div>

        <div
          className="row p-2 border border-secondary  mx-5"
          style={{ backgroundColor: "#CBCBCB" }}
        >
          <div className="col-2">PROFILEPicture</div>
          <div className="col-2">Name</div>
          <div className="col-2">Job title</div>
          <div className="col-2">Target Salery</div>
          <div className="col-2">Email</div>
          

          <div className="col-2"></div>
        </div>
        {initialData.initialUsers.length > 0 ? (
          <div>
            {initialData.initialUsers.map((User, index) => (
  //  console.log(job)
              <div
                key={index}
                className="row p-2 border-top-0 border border-secondary bg-light mx-5"
              >
                <div className="col-2 pt-2">
                <img
                    src={
                      User.PROFILEPicture
                        ? generatePublicUrl(User.PROFILEPicture)
                        : "/Images/avatar.jpg"
                    }
                    className="img-fluid img-thumbnail "
                  ></img>
                </div>
                <div className="col-2 pt-2">{`${User.firstName} ${User.lastName}`}</div>
                <div className="col-2 pt-2">{User.JobTitle}</div>
                <div className="col-2 pt-2">
                 {User.TargetSalery} (Rs)
                </div>
                <div className="col-2">{User.email}</div>
                <div className="col-2">
                  <Link
                    className="btn btn-primary "
                    to={`/user/completeProfile`}
                    onClick={()=>dispatch(getSingleUserDetail(User._id))}
                  >
                    View Detail
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="row text-center row p-2 border-top-0 border border-secondary bg-light mx-5">
            <div className="col-12 p-4">No Users Found...</div>
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

export default RecuireterLoginPage;
