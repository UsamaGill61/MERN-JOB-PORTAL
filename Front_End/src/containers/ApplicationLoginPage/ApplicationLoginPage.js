import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { generatePublicUrl } from "../../urlConfig";
import { UpdateApplicant, ResetRoute } from "../../actions";
import JobsSection from "../LandingPage/JobsSection";

const ApplicationLoginPage = () => {
  let auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const {
    fatherName,
    firstName,
    email,
    ToolsArray,
    SkillsArray,
    lastName,
    DegreeLevel,
    TargetSalery,
    JobTitle,
    CareerLevel,
    country,
    cnic,
    Fax,
    age,
    gender,
    maritalStatus,
    religion,
    mobile,
    landline,
    address,
    city,
    summery,
    PROFILEPicture,
  } = auth.user;

  useEffect(() => {
    dispatch(ResetRoute());
  }, []);
  if (auth.user.SkillsArray) {
    return (
      <div className="container-fluid">
        <div className="row p-2">
          <div className="col-12 text-right">
            <Link className="btn btn-primary " to={`/updateYourProfile`}>
              Update Your Profile
            </Link>
          </div>
        </div>
        <div className="row p-2">
          <div className="container-fluid">
            <div className="row m-5  ">
              {/* ...................................Left Side........................... */}
              <div
                className="col-3 bg-light "
                style={{ backgroundColor: "#CBCBCB" }}
              >
                <div className="row px-3 pt-3  text-danger  font-weight-bold">
                  <img
                    src={
                      PROFILEPicture
                        ? generatePublicUrl(PROFILEPicture)
                        : "/Images/avatar.jpg"
                    }
                    className="img-fluid img-thumbnail "
                  ></img>
                </div>
                <div></div>
                <div className="row px- pt-3  ">
                  <div className="col-12 text-danger font-weight-bold">
                    Personal Info
                  </div>
                </div>

                <div>
                  <hr
                    className="mt-2"
                    style={{ borderTop: "1px solid #222222" }}
                  />
                </div>

                <div className="row ">
                  <div className="col-4 pb-2">Name</div>
                  <div className="col-8  ">{`${firstName} ${lastName}`}</div>
                </div>
                <div className="row ">
                  <div className="col-4 pb-2">Father Name</div>
                  <div className="col-8  ">{fatherName}</div>
                </div>
                <div className="row ">
                  <div className="col-4 pb-2">CNIC</div>
                  <div className="col-8  ">{cnic}</div>
                </div>

                <div className="row ">
                  <div className="col-4 pb-2">Age</div>
                  <div className="col-8  ">{age} Years</div>
                </div>
                <div className="row ">
                  <div className="col-4 pb-2">Gender</div>
                  <div className="col-8  ">{gender}</div>
                </div>
                <div className="row ">
                  <div className="col-4 pb-2">Martial Status</div>
                  <div className="col-8  ">{maritalStatus}</div>
                </div>
                <div className="row ">
                  <div className="col-4 pb-2">Religion</div>
                  <div className="col-8  ">{religion}</div>
                </div>
                <div className="row ">
                  <div className="col-4 pb-2">Mobile</div>
                  <div className="col-8  ">{mobile}</div>
                </div>
                <div className="row ">
                  <div className="col-4 pb-2">Land Line</div>
                  <div className="col-8  ">{landline}</div>
                </div>
                <div className="row ">
                  <div className="col-4 pb-2">Address</div>
                  <div className="col-8  ">{address}</div>
                </div>
                <div className="row ">
                  <div className="col-4 pb-2">Fax</div>
                  <div className="col-8  ">{Fax}</div>
                </div>
                <div className="row ">
                  <div className="col-4 pb-2">City</div>
                  <div className="col-8  ">{city}</div>
                </div>

                <div className="row ">
                  <div className="col-4 pb-2">E-mail</div>
                  <div className="col-8  ">{`${email}`}</div>
                </div>
                <div className="row ">
                  <div className="col-4 pb-2">Nationality</div>
                  <div className="col-8  ">{country}</div>
                </div>

                <div className="row px- pt-3  ">
                  <div className="col-12 text-danger font-weight-bold">
                    Target Job
                  </div>
                </div>

                <div>
                  <hr
                    className="mt-2"
                    style={{ borderTop: "1px solid #222222" }}
                  />
                </div>
                <div className="row ">
                  <div className="col-4 pb-2">Job Title</div>
                  <div className="col-8  ">{JobTitle}</div>
                </div>
                <div className="row ">
                  <div className="col-4 pb-2">Career Level</div>
                  <div className="col-8  ">{CareerLevel} Experience</div>
                </div>
                <div className="row ">
                  <div className="col-4 pb-2">Target Salary</div>
                  <div className="col-8  ">{TargetSalery} Rs</div>
                </div>
              </div>

              {/* ................................Right side............................ */}
              <div className="col-7 ">
                <div className="row px-3 pt-3 text-danger font-weight-bold">
                  Summery
                </div>
                <div>
                  <hr
                    className="mt-1"
                    style={{ borderTop: "1px solid #222222" }}
                  />
                </div>
                <div className="row px-3 ">{summery}</div>

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
                    {DegreeLevel}
                  </div>
                </div>

                <div className="row px-3 pt-3 text-danger font-weight-bold">
                  Skills
                </div>
                <div>
                  <hr
                    className="mt-1"
                    style={{ borderTop: "1px solid #222222" }}
                  />
                </div>
                <div className="row px-3 ">
                  {SkillsArray.length > 0 ? (
                    SkillsArray.map((skill, index) => (
                      <div
                        key={index}
                        className="border mr-3 bg-info p-2 m-2 rounded border-info"
                      >
                        {skill}
                      </div>
                    ))
                  ) : (
                    <div className="border mr-3 bg-danger p-2 rounded border-danger">
                      No Skill Added
                    </div>
                  )}
                </div>
                <div className="row px-3 pt-3 text-danger font-weight-bold">
                  Tools
                </div>
                <div>
                  <hr
                    className="mt-1"
                    style={{ borderTop: "1px solid #222222" }}
                  />
                </div>
                <div className="row px-3 pb-5">
                  {ToolsArray.length > 0 ? (
                    ToolsArray.map((tools, index) => (
                      <div
                        key={index}
                        className="border mr-3 bg-info p-2 m-2 rounded border-info"
                      >
                        {tools}
                      </div>
                    ))
                  ) : (
                    <div className="border mr-3 bg-danger p-2 rounded border-danger">
                      No Tools Added
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <JobsSection />
      </div>
    );
  } else {
    return <div>Loading.......</div>;
  }
};

export default ApplicationLoginPage;
