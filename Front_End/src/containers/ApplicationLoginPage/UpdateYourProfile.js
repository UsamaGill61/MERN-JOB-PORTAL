import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import ErrorMessages from "../../components/Header/ErrorMessages";
import { UpdateApplicant,ResetRoute } from "../../actions";

import MaskedInput from "react-text-mask";

import {
  experienceRequiredDropDownValues,
  DegreeLevelValues,
  genderDropDownValues2options,
  maritalStatusValues,
} from "../../containers/JobPosterLoginPage/AllDropDownValues";
import SelectCountry from "./SelectCountry";
import SelectCity from "./SelectCity";

const UpdateYourProfile = ({ postJobModel, setpostJobModel }) => {
  const [CNIC, setCNIC] = useState("");
  const [Faxno, setFaxno] = useState("");
  const [mobileno, setmobileno] = useState("");
  const [landlineno, setlandlineno] = useState("");
  const [countryname, setcountryname] = useState("");
  const [Religion, setReligion] = useState("");
  const [City, setCity] = useState("");
  const [Summery, setSummery] = useState("");
  const [OneSkill, setOneSkill] = useState("");
  const [OneSkillError, setOneSkillError] = useState("");
  const [skillsArray, setskillsArray] = useState([]);

  const [OneTool, setOneTool] = useState("");
  const [OneToolError, setOneToolError] = useState("");
  const [toolsArray, settoolsArray] = useState([]);
  const [profilePicture, setprofilePicture] = useState();

  const jobPosting = useSelector((state) => state.jobPosting);
  const dispatch = useDispatch();
  let auth = useSelector((state) => state.auth);

  const {
    fatherName,
    firstName,
    email,
    lastName,
    TargetSalery,
    JobTitle,
    age,
    address,
    _id,
    DegreeLevel,
    maritalStatus,
    CareerLevel,
    gender,
    country,
    cnic,
    Fax,
    religion,
    mobile,
    landline,
    city,
    ToolsArray,
    SkillsArray,
    summery,
    PROFILEPicture,
  } = auth.user;

  useEffect(() => {
    setCNIC(cnic);
    setFaxno(Fax);
    setmobileno(mobile);
    setlandlineno(landline);
    setcountryname(country);
    setReligion(religion);
    setCity(city);
    setskillsArray(SkillsArray);
    settoolsArray(ToolsArray);
    setSummery(summery);
  }, [auth.user]);



  if (auth.UpdateUser)
    return (
      <Redirect
        to={{
          pathname: "/ApplicationLoginPage",
        }}
      />
    
    );




  const handleSkills = (e) => {
    if (OneSkill) {
      setskillsArray([...skillsArray, OneSkill]);
      setOneSkill("");
      setOneSkillError("");
    } else {
      setOneSkillError("Field is Empty");
    }
  };
  const deleteSkillArrayItem = (index) => {
    setskillsArray(skillsArray.filter((eachSkill, Index) => Index !== index));
  };
  const handleTools = (e) => {
    if (OneTool) {
      settoolsArray([...toolsArray, OneTool]);
      setOneTool("");
      setOneToolError("");
    } else {
      setOneToolError("Field is Empty");
    }
  };
  const deleteToolsArrayItem = (index) => {
    settoolsArray(toolsArray.filter((eachTool, Index) => Index !== index));
  };

  const initialValues = {
    fatherName,
    firstName,
    email,
    lastName,
    TargetSalery,
    JobTitle,
    age,
    address,
    DegreeLevel,
    maritalStatus,
    CareerLevel,
    gender,
  };
  const validationSchema = Yup.object({
    firstName: Yup.string().required("firstName is a required field"),
    lastName: Yup.string().required("LastName is a required field"),
    fatherName: Yup.string().required(
      "fatherName Required is a required Field"
    ),
    email: Yup.string().email().required("Email is required"),
    TargetSalery: Yup.string().required("TargetSalery is a required field"),
    JobTitle: Yup.string().required("JobTitle is a required field"),
    age: Yup.number().required("Age is a required field"),
    address: Yup.string().required("Address Status is a required field"),
    DegreeLevel: Yup.string().required("DegreeLevel is a required field"),
    gender: Yup.string().required("gender is a required field"),
    maritalStatus: Yup.string().required("marital Status is a required field"),
    CareerLevel: Yup.string().required("Career Level is a required field"),
  });
  const OnSubmitApplication = (values) => {
    const form = new FormData();
    form.append("_id", _id);
    form.append("firstName", values.firstName);
    form.append("lastName", values.lastName);
    form.append("fatherName", values.fatherName);
    form.append("email", values.email);
    form.append("TargetSalery", values.TargetSalery);
    form.append("JobTitle", values.JobTitle);
    form.append("age", values.age);
    form.append("address", values.address);
    form.append("maritalStatus", values.maritalStatus);
    form.append("CareerLevel", values.CareerLevel);
    form.append("gender", values.gender);
    form.append("DegreeLevel", values.DegreeLevel);
    form.append("religion", Religion);
    form.append("city", City);

    form.append("cnic", CNIC);
    form.append("Fax", Faxno);
    form.append("landline", landlineno);
    form.append("PROFILEPicture", profilePicture);
    form.append("country", countryname);
    form.append("mobile", mobileno);
    form.append("summery", Summery);
    for (let skill of skillsArray) {
      form.append("Skills", skill);
    }
    for (let Tool of toolsArray) {
      form.append("Tools", Tool);
    }

    dispatch(UpdateApplicant(form));
    // for (var value of form.values()) {
    //   console.log(value);
    // }
  };


  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={OnSubmitApplication}
      >
        <Form className="form-signin mx-5">
          <div className="row text-center">
            <div className="col-12">
              <h2 className="h3 my-3 font-weight-normal ">
                Update Your Profile
              </h2>
            </div>
          </div>
          <div className="row bg-light ">
            <div className="col-6">
              <label htmlFor="firstName">FirstName</label>
              <Field
                id="#firstName"
                type="text"
                className="form-control mb-2"
                placeholder="Add firstName"
                name="firstName"
              />

              <ErrorMessage name="firstName" component={ErrorMessages} />
            </div>{" "}
            <div className="col-6">
              <label htmlFor="lastName">LastName</label>
              <Field
                id="#lastName"
                type="text"
                className="form-control mb-2"
                placeholder="Add LastName"
                name="lastName"
              />

              <ErrorMessage name="lastName" component={ErrorMessages} />
            </div>
          </div>

          <div className="row ">
            <div className="col-6">
              <label htmlFor="fatherName">FatherName</label>
              <Field
                id="#fatherName"
                type="text"
                className="form-control mb-2"
                placeholder="Add fatherName"
                name="fatherName"
              />

              <ErrorMessage name="fatherName" component={ErrorMessages} />
            </div>{" "}
            <div className="col-6">
              <label htmlFor="email">Email</label>
              <Field
                id="#email"
                type="email"
                className="form-control mb-2"
                placeholder="email"
                name="email"
              />

              <ErrorMessage name="email" component={ErrorMessages} />
            </div>
          </div>

          <div className="row bg-light">
            <div className="col-6">
              <label htmlFor="TargetSalery">Enter your Target Salery </label>
              <Field
                id="#TargetSalery"
                type="number"
                className="form-control mb-2"
                placeholder="Add Target Salery"
                name="TargetSalery"
              />

              <ErrorMessage name="TargetSalery" component={ErrorMessages} />
            </div>{" "}
            <div className="col-6">
              <label htmlFor="TotalPositions">
                Enter Job Title which You are looking for to get
              </label>
              <Field
                id="#JobTitle"
                type="text"
                className="form-control mb-2"
                placeholder="Add Job Title"
                name="JobTitle"
              />

              <ErrorMessage name="JobTitle" component={ErrorMessages} />
            </div>
          </div>
          <div className="row ">
            <div className="col-6">
              <label htmlFor="age">Enter Age </label>
              <Field
                id="#age"
                type="number"
                className="form-control mb-2"
                placeholder="Add age"
                name="age"
              />

              <ErrorMessage name="age" component={ErrorMessages} />
            </div>{" "}
            <div className="col-6">
              <label htmlFor="address">Enter address</label>
              <Field
                id="#address"
                type="text"
                className="form-control mb-2"
                placeholder="Add address"
                name="address"
              />

              <ErrorMessage name="address" component={ErrorMessages} />
            </div>
          </div>

          <div className="row bg-light">
            <div className="col-6">
              <label htmlFor="DegreeLevel">Select Degree Level</label>
              <Field
                id="#DegreeLevel"
                as="select"
                className="form-control mb-2"
                name="DegreeLevel"
              >
                {DegreeLevelValues.map((option) => {
                  return (
                    <option key={option.value} value={option.value}>
                      {option.key}
                    </option>
                  );
                })}
              </Field>

              <ErrorMessage name="DegreeLevel" component={ErrorMessages} />
            </div>{" "}
            <div className="col-6">
              <label htmlFor="gender">Select Gender</label>
              <Field
                id="#gender"
                as="select"
                className="form-control mb-2"
                name="gender"
              >
                {genderDropDownValues2options.map((option) => {
                  return (
                    <option key={option.value} value={option.value}>
                      {option.key}
                    </option>
                  );
                })}
              </Field>

              <ErrorMessage name="gender" component={ErrorMessages} />
            </div>{" "}
          </div>

          <div className="row ">
            <div className="col-6">
              <label htmlFor="maritalStatus">Select Marital Status</label>
              <Field
                id="#maritalStatus"
                as="select"
                className="form-control mb-2"
                name="maritalStatus"
              >
                {maritalStatusValues.map((option) => {
                  return (
                    <option key={option.value} value={option.value}>
                      {option.key}
                    </option>
                  );
                })}
              </Field>

              <ErrorMessage name="maritalStatus" component={ErrorMessages} />
            </div>{" "}
            <div className="col-6">
              <label htmlFor="CareerLevel">Select Career Level</label>
              <Field
                id="#CareerLevel"
                as="select"
                className="form-control mb-2"
                name="CareerLevel"
              >
                {experienceRequiredDropDownValues.map((option) => {
                  return (
                    <option key={option.value} value={option.value}>
                      {option.key}
                    </option>
                  );
                })}
              </Field>

              <ErrorMessage name="CareerLevel" component={ErrorMessages} />
            </div>
          </div>

          <div className="row pt-2 bg-light">
            <div className="col-6">
              <label htmlFor="maritalStatus">Enter CNIC</label>{" "}
              <MaskedInput
                className="form-control"
                guide={true}
                showMask={true}
                value={CNIC}
                onChange={(e) => setCNIC(e.target.value)}
                mask={[
                  /[0-9]/,
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                  "-",
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                  "-",
                  /\d/,
                ]}
              />
            </div>{" "}
            <div className="col-6">
              <label htmlFor="maritalStatus">Enter Fax No</label>{" "}
              <MaskedInput
                className="form-control"
                guide={true}
                showMask={true}
                value={Faxno}
                onChange={(e) => setFaxno(e.target.value)}
                mask={[
                  "+",
                  /[0-9]/,
                  /\d/,
                  "-",
                  /\d/,
                  /\d/,
                  /\d/,
                  "-",
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                ]}
              />
            </div>{" "}
          </div>

          <div className="row ">
            <div className="col-6">
              <label htmlFor="maritalStatus">Enter Mobile Number</label>{" "}
              <MaskedInput
                className="form-control"
                guide={true}
                showMask={true}
                value={mobileno}
                onChange={(e) => setmobileno(e.target.value)}
                mask={[
                  /[0-9]/,
                  /\d/,
                  /\d/,
                  /\d/,
                  "-",
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                ]}
              />
            </div>{" "}
            <div className="col-6">
              <label htmlFor="maritalStatus">Enter Land Line No</label>{" "}
              <MaskedInput
                className="form-control"
                guide={true}
                showMask={true}
                value={landlineno}
                onChange={(e) => setlandlineno(e.target.value)}
                mask={[
                  "(",
                  /[0-9]/,
                  /\d/,
                  /\d/,
                  ")",
                  "-",
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                ]}
              />
            </div>{" "}
          </div>

          <div className="row bg-light">
            <div className="col-6">
              <label>Select Country</label>{" "}
              <SelectCountry
                setcountryname={setcountryname}
                countryname={countryname}
              />
            </div>
            <div className="col-6">
              <label>Select Religion</label>{" "}
              <select
                onChange={(e) => setReligion(e.target.value)}
                className="form-control"
              >
                <option>{Religion}</option>

                <option value="Muslim">Muslim</option>
                <option value="Non Muslim">Non Muslim</option>
              </select>
            </div>{" "}
          </div>

          <div className="row ">
            <div className="col-6 ">
              <label>Select City</label>{" "}
              <SelectCity City={City} setCity={setCity} />
            </div>
            <div className="col-6 ">
              <label>Select City</label>{" "}
              <input
                className="form-control"
                type="file"
                onChange={(e) => setprofilePicture(e.target.files[0])}
              ></input>
            </div>
          </div>
          <div className="row bg-light">
            <div className="col-12 ">
              <label>Describe Your Self(Summery)</label>{" "}
              <textarea
                onChange={(e) => setSummery(e.target.value)}
                className="form-control"
                value={Summery}
                rows="4"
              ></textarea>
            </div>
          </div>
          <div className="row ">
            <div className="col-6 ">
              <label>Enter Skills One By One</label>{" "}
              {skillsArray.length > 0
                ? skillsArray.map((Skill, index) => (
                    <div
                      style={{ display: "flex" }}
                      className=" bg-light px-1"
                      key={index}
                    >
                      <div className="pt-2 px-5">{Skill}</div>
                      <div>
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => deleteSkillArrayItem(index)}
                        >
                          Remove Skill
                        </button>
                      </div>
                    </div>
                  ))
                : null}
              <input
                type="text"
                className="form-control"
                name="SkillsArray"
                value={OneSkill}
                onChange={(e) => setOneSkill(e.target.value)}
              />
              {OneSkillError ? (
                <p style={{ color: "red" }}>{OneSkillError}</p>
              ) : null}
              <button
                className="btn-info border rounded my-1"
                type="button"
                onClick={handleSkills}
              >
                Add Skill
              </button>
            </div>{" "}
            <div className="col-6 ">
              <label>Enter Tools You Know One By One</label>{" "}
              {toolsArray.length > 0
                ? toolsArray.map((Tools, index) => (
                    <div
                      style={{ display: "flex" }}
                      className=" bg-light px-1"
                      key={index}
                    >
                      <div className="pt-2 px-5">{Tools}</div>
                      <div>
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => deleteToolsArrayItem(index)}
                        >
                          Remove Tool
                        </button>
                      </div>
                    </div>
                  ))
                : null}
              <input
                type="text"
                className="form-control"
                name="SkillsArray"
                value={OneTool}
                onChange={(e) => setOneTool(e.target.value)}
              />
              {OneToolError ? (
                <p style={{ color: "red" }}>{OneToolError}</p>
              ) : null}
              <button
                className="btn-info border rounded my-1"
                type="button"
                onClick={handleTools}
              >
                Add Tools
              </button>
            </div>{" "}
          </div>
          <button
            className="btn btn-lg btn-primary btn-block mb-3"
            type="submit"
          >
            Submit
          </button>
        </Form>
      </Formik>
    </>
  );
};

export default UpdateYourProfile;
