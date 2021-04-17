import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import ErrorMessages from "../../components/Header/ErrorMessages";
import { Modal } from "react-bootstrap";
import { PostJob } from "../../actions";
import DatePicker from "react-date-picker";
import { ToastContainer, toast } from "react-toastify";

import {
  experienceRequiredDropDownValues,
  employmentStatusDropDownValues,
  genderDropDownValues,
  AgeDownValues,
  DegreeLevelValues,
} from "./AllDropDownValues";

toast.configure();
const PostJobModel = ({ postJobModel, setpostJobModel }) => {
  const [value, onChange] = useState(null);
  const [DateError, setDateError] = useState("");
  const [succesfullAlert, setsuccesfullAlert] = useState(false);

  const jobPosting = useSelector((state) => state.jobPosting);
  const dispatch = useDispatch();
  let auth = useSelector((state) => state.auth);

  const notify = () =>
    toast.info(
      `${jobPosting.message}`,

      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        // onClose: () => dispatch(emptyErrorFiildsAfterSignUp()),
      }
    );

  if (succesfullAlert) notify();

  useEffect(() => {
    if (jobPosting.jobposting) {
      setsuccesfullAlert(true);
      setpostJobModel(false);
    }
  }, [jobPosting.jobposting]);

  const initialValues = {
    title: "klnklwnvkl",
    description: "klvnkvkl",
    experienceRequired: "vklerkvakl",
    location: "klevnkl;rk",
    companyName: "erkklevla",
    TotalPositions: "3",
    employmentStatus: "eklfvklaenlvnskvvkla",
    Role: "vklmlakvm",
    Gender: "vnfnaff",
    monthlySalery: "3333",
    age: "33",
    degreeLevel: "sjvhoaefjvoevao",
    requiredSkills: [""],
    requiredTools: [""],
  };
  const validationSchema = Yup.object({
    title: Yup.string().required("Title is a required field"),
    description: Yup.string().required("Description is a required field"),
    experienceRequired: Yup.string().required(
      "Experience Required is a required Field"
    ),
    location: Yup.string().required("location is a required field"),
    companyName: Yup.string().required("companyName is a required field"),
    TotalPositions: Yup.number().required("TotalPositions is a required field"),
    employmentStatus: Yup.string().required(
      "employment Status is a required field"
    ),
    Role: Yup.string().required("Role Status is a required field"),

    Gender: Yup.string().required("Gender is a required field"),
    monthlySalery: Yup.number().required("monthlySalery is a required field"),
    age: Yup.string().required("Age is a required field"),
    degreeLevel: Yup.string().required("Age is a required field"),

    // requiredSkills: Yup.array().min(2, "Required Skill field must have one Item"),
    // requiredTools: Yup.array().min(2, "Required Tools field must have one Item"),
  });
  const OnSubmitApplication = (values) => {
    if (value) {
      const JobPosted = {
        title: values.title,
        description: values.description,
        experienceRequired: values.experienceRequired,
        location: values.location,
        companyName: values.companyName,
        TotalPositions: values.TotalPositions,
        employmentStatus: values.employmentStatus,
        Role: values.Role,
        Gender: values.Gender,
        monthlySalery: values.monthlySalery,
        age: values.age,
        degreeLevel: values.degreeLevel,
        requiredSkills: values.requiredSkills,
        requiredTools: values.requiredTools,
        lastDateToApply: value,
      };
      setDateError("");
      dispatch(PostJob(JobPosted));
    } else {
      setDateError("Select Last Date Of Submission");
    }

    // dispatch(login(user));
  };
  // useEffect(() => {
  //   setloginModel(false);
  // }, [auth.authenticate]);

  const PostJobModel = () => {
    return (
      <Modal size="xl" show={postJobModel} onHide={setpostJobModel}>
        <Modal.Header closeButton></Modal.Header>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={OnSubmitApplication}
        >
          <Form className="form-signin mx-5">
            <div className="row text-center">
              <div className="col-12">
                <h2 className="h3 mb-3 font-weight-normal ">Post A New Job</h2>
              </div>
            </div>
            <div className="row ">
              <div className="col-6">
                <label htmlFor="title">Enter Title of Job</label>
                <Field
                  id="#title"
                  type="text"
                  className="form-control mb-2"
                  placeholder="Add Title"
                  name="title"
                />

                <ErrorMessage name="title" component={ErrorMessages} />
              </div>{" "}
              <div className="col-6">
                <label htmlFor="description">Enter description of Job</label>
                <Field
                  id="#description"
                  type="text"
                  className="form-control mb-2"
                  placeholder="Add description"
                  name="description"
                />

                <ErrorMessage name="description" component={ErrorMessages} />
              </div>
            </div>

            <div className="row ">
              <div className="col-6">
                <label htmlFor="experienceRequired">
                  Select Experience Required
                </label>
                <Field
                  id="#experienceRequired"
                  as="select"
                  className="form-control mb-2"
                  placeholder="Experience Required "
                  name="experienceRequired"
                >
                  {experienceRequiredDropDownValues.map((option) => {
                    return (
                      <option key={option.value} value={option.value}>
                        {option.key}
                      </option>
                    );
                  })}
                </Field>

                <ErrorMessage
                  name="experienceRequired"
                  component={ErrorMessages}
                />
              </div>{" "}
              <div className="col-6">
                <label htmlFor="location">Add Location/City</label>
                <Field
                  id="#location"
                  type="text"
                  className="form-control mb-2"
                  placeholder="Add location/City"
                  name="location"
                />

                <ErrorMessage name="location" component={ErrorMessages} />
              </div>
            </div>

            <div className="row ">
              <div className="col-6">
                <label htmlFor="companyName">Enter your company Name </label>
                <Field
                  id="#companyName"
                  type="text"
                  className="form-control mb-2"
                  placeholder="Add company Name"
                  name="companyName"
                />

                <ErrorMessage name="companyName" component={ErrorMessages} />
              </div>{" "}
              <div className="col-6">
                <label htmlFor="TotalPositions">
                  Enter Total Positions of Job
                </label>
                <Field
                  id="#TotalPositions"
                  type="number"
                  className="form-control mb-2"
                  placeholder="Add Total Positions of Job"
                  name="TotalPositions"
                />

                <ErrorMessage name="TotalPositions" component={ErrorMessages} />
              </div>
            </div>

            <div className="row ">
              <div className="col-6">
                <label htmlFor="employmentStatus">
                  Select Employment Status
                </label>
                <Field
                  id="#employmentStatus"
                  as="select"
                  className="form-control mb-2"
                  name="employmentStatus"
                >
                  {employmentStatusDropDownValues.map((option) => {
                    return (
                      <option key={option.value} value={option.value}>
                        {option.key}
                      </option>
                    );
                  })}
                </Field>

                <ErrorMessage
                  name="employmentStatus"
                  component={ErrorMessages}
                />
              </div>{" "}
              <div className="col-6">
                <label htmlFor="Gender">Select Gender</label>
                <Field
                  id="#Gender"
                  as="select"
                  className="form-control mb-2"
                  name="Gender"
                >
                  {genderDropDownValues.map((option) => {
                    return (
                      <option key={option.value} value={option.value}>
                        {option.key}
                      </option>
                    );
                  })}
                </Field>

                <ErrorMessage name="Gender" component={ErrorMessages} />
              </div>{" "}
            </div>

            <div className="row ">
              <div className="col-6">
                <label htmlFor="monthlySalery">Enter Monthly Salery </label>
                <Field
                  id="#monthlySalery"
                  type="number"
                  className="form-control mb-2"
                  placeholder="Add Monthly Salery"
                  name="monthlySalery"
                />

                <ErrorMessage name="monthlySalery" component={ErrorMessages} />
              </div>{" "}
              <div className="col-6">
                <label htmlFor="Role">Enter Role</label>
                <Field
                  id="#Role"
                  type="text"
                  className="form-control mb-2"
                  placeholder="Add Role"
                  name="Role"
                />

                <ErrorMessage name="Role" component={ErrorMessages} />
              </div>
            </div>

            <div className="row ">
              <div className="col-6">
                <label htmlFor="age">Select Age</label>
                <Field
                  id="#age"
                  as="select"
                  className="form-control mb-2"
                  name="age"
                >
                  {AgeDownValues.map((option) => {
                    return (
                      <option key={option.value} value={option.value}>
                        {option.key}
                      </option>
                    );
                  })}
                </Field>

                <ErrorMessage name="age" component={ErrorMessages} />
              </div>{" "}
              <div className="col-6">
                <label htmlFor="degreeLevel">Select Degree Level</label>
                <Field
                  id="#degreeLevel"
                  as="select"
                  className="form-control mb-2"
                  name="degreeLevel"
                >
                  {DegreeLevelValues.map((option) => {
                    return (
                      <option key={option.value} value={option.value}>
                        {option.key}
                      </option>
                    );
                  })}
                </Field>

                <ErrorMessage name="degreeLevel" component={ErrorMessages} />
              </div>
            </div>

            <div className="row ">
              <div className="col-6">
                <label>Enter required Skills(Optional)</label>
                <FieldArray name="requiredSkills">
                  {(FieldArrayprops) => {
                    const { push, remove, form } = FieldArrayprops;
                    const { values } = form;
                    const { requiredSkills } = values;

                    return (
                      <div>
                        {requiredSkills.map((degree, index) => (
                          <div key={index}>
                            <div className="row">
                              <div className="col-8">
                                <Field
                                  className="form-control mb-2"
                                  name={`requiredSkills[${index}]`}
                                />
                              </div>
                              <div className="col-3">
                                <button
                                  className="btn btn-sm btn-info"
                                  type="button"
                                  onClick={() => push("")}
                                >
                                  Add more
                                </button>
                              </div>
                              <div className="col-1">
                                {index > 0 && (
                                  <button
                                    className="btn btn-sm btn-danger"
                                    type="button"
                                    onClick={() => remove(index)}
                                  >
                                    -
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  }}
                </FieldArray>
                <ErrorMessage name="requiredSkills" component={ErrorMessages} />
              </div>{" "}
              <div className="col-6">
                <label>Enter Required Tools(Optional)</label>
                <FieldArray name="requiredTools">
                  {(FieldArrayprops) => {
                    const { push, remove, form } = FieldArrayprops;
                    const { values } = form;
                    const { requiredTools } = values;

                    return (
                      <div>
                        {requiredTools.map((degree, index) => (
                          <div key={index}>
                            <div className="row">
                              <div className="col-8">
                                <Field
                                  className="form-control mb-2"
                                  name={`requiredTools[${index}]`}
                                />
                              </div>
                              <div className="col-3">
                                <button
                                  className="btn btn-sm btn-info"
                                  type="button"
                                  onClick={() => push("")}
                                >
                                  Add more
                                </button>
                              </div>
                              <div className="col-1">
                                {index > 0 && (
                                  <button
                                    className="btn btn-sm btn-danger"
                                    type="button"
                                    onClick={() => remove(index)}
                                  >
                                    -
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  }}
                </FieldArray>
                <ErrorMessage name="requiredTools" component={ErrorMessages} />
              </div>{" "}
            </div>
            <div className="row pt-2">
              <div className="col-3"></div>
              <div className="col-6">
                <label>Last Day To Apply</label>
                <DatePicker
                  onChange={(date) => onChange(date)}
                  value={value}
                  minDate={new Date()}
                  className="form-control mb-2"
                />
                {DateError ? <p style={{ color: "red" }}>{DateError}</p> : null}
              </div>
              <div className="col-3"></div>
            </div>

            <div>
              {jobPosting.message2 ? <p style={{ color: "red" }}>{jobPosting.message2}</p> : null}
            </div>
            <button
              className="btn btn-lg btn-primary btn-block mb-3"
              type="submit"
            >
              Submit
            </button>
            {/* <div className="mb-4">
              <a href="#">Forget Password..?</a>
            </div> */}
          </Form>
        </Formik>
      </Modal>
    );
  };

  return <>{PostJobModel()}</>;
};

export default PostJobModel;
