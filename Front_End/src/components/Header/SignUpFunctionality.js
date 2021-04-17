import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import ErrorMessages from "./ErrorMessages";
import { Modal } from "react-bootstrap";
import { signup } from "../../actions";

const SignUpFunctionality = ({
  signupAsApplicantModel,
  setsignupAsApplicantModel,
  signupAsJobPosterModel,
  setsignupAsJobPosterModel,
  signupAsRecruiterModel,
  setsignupAsRecruiterModel,
}) => {
  const dispatch = useDispatch();
  let auth = useSelector((state) => state.auth);

  const InitialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };
  const ValidationSchema = Yup.object({
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    email: Yup.string()
      .email("Invalid Email Format")
      .required("Email is a required field"),
    password: Yup.string()
      .required("No password provided.")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  });
  const OnSubmitApplication = (values) => {
    const user = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
      role: "Applicant",
    };
    dispatch(signup(user));
  };
  const OnSubmitJobPoster = (values) => {
    const user = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
      role: "Poster",
    };
    dispatch(signup(user));
  };
  const OnSubmitRecuriter = (values) => {
    const user = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
      role: "Recureter",
    };
    dispatch(signup(user));
  };
  useEffect(() => {
    setsignupAsApplicantModel(false);
    setsignupAsJobPosterModel(false);
    setsignupAsRecruiterModel(false);
  }, [auth.authenticate]);

  const SignupAsApplicantModel = () => {
    return (
      <Modal show={signupAsApplicantModel} onHide={setsignupAsApplicantModel}>
        <Modal.Header closeButton></Modal.Header>
        <Formik
          initialValues={InitialValues}
          validationSchema={ValidationSchema}
          onSubmit={OnSubmitApplication}
        >
          <Form className="form-signin mx-5">
            <div className="row text-center">
              <div className="col-12">
                <h2 className="h3 mb-3 font-weight-normal ">
                  Sign Up As Applicant
                </h2>
              </div>
            </div>
            <Field
              type="text"
              className="form-control mb-2"
              placeholder="First Name"
              name="firstName"
            />

            <ErrorMessage name="firstName" component={ErrorMessages} />
            <Field
              type="text"
              className="form-control mb-2"
              placeholder="Last Name"
              name="lastName"
            />

            <ErrorMessage name="lastName" component={ErrorMessages} />
            <Field
              type="email"
              className="form-control mb-2"
              placeholder="Email address"
              name="email"
            />

            <ErrorMessage name="email" component={ErrorMessages} />

            <Field
              type="password"
              className="form-control mb-2"
              placeholder="Password"
              name="password"
            />
            <div>
              <ErrorMessage name="password" component={ErrorMessages} />
            </div>

            <div>
              {auth.error ? <p style={{ color: "red" }}>{auth.error}</p> : null}
            </div>
            <button
              className="btn btn-lg btn-primary btn-block mb-3"
              type="submit"
            >
              Sign In
            </button>
            {/* <div className="mb-4">
                  <a href="#">Forget Password..?</a>
                </div> */}
          </Form>
        </Formik>
      </Modal>
    );
  };
  const SignupAsJobPosterModel = () => {
    return (
      <Modal show={signupAsJobPosterModel} onHide={setsignupAsJobPosterModel}>
        <Modal.Header closeButton></Modal.Header>
        <Formik
          initialValues={InitialValues}
          validationSchema={ValidationSchema}
          onSubmit={OnSubmitJobPoster}
        >
          <Form className="form-signin mx-5">
            <div className="row text-center">
              <div className="col-12">
                <h2 className="h3 mb-3 font-weight-normal ">
                  Sign Up As Job Poster
                </h2>
              </div>
            </div>
            <Field
              type="text"
              className="form-control mb-2"
              placeholder="First Name"
              name="firstName"
            />

            <ErrorMessage name="firstName" component={ErrorMessages} />
            <Field
              type="text"
              className="form-control mb-2"
              placeholder="Last Name"
              name="lastName"
            />

            <ErrorMessage name="lastName" component={ErrorMessages} />
            <Field
              type="email"
              className="form-control mb-2"
              placeholder="Email address"
              name="email"
            />

            <ErrorMessage name="email" component={ErrorMessages} />

            <Field
              type="password"
              className="form-control mb-2"
              placeholder="Password"
              name="password"
            />
            <div>
              <ErrorMessage name="password" component={ErrorMessages} />
            </div>

            <div>
              {auth.error ? <p style={{ color: "red" }}>{auth.error}</p> : null}
            </div>
            <button
              className="btn btn-lg btn-primary btn-block mb-3"
              type="submit"
            >
              Sign In
            </button>
            {/* <div className="mb-4">
                  <a href="#">Forget Password..?</a>
                </div> */}
          </Form>
        </Formik>
      </Modal>
    );
  };
  const SignupAsRecruiterModel = () => {
    return (
      <Modal show={signupAsRecruiterModel} onHide={setsignupAsRecruiterModel}>
        <Modal.Header closeButton></Modal.Header>
        <Formik
          initialValues={InitialValues}
          validationSchema={ValidationSchema}
          onSubmit={OnSubmitRecuriter}
        >
          <Form className="form-signin mx-5">
            <div className="row text-center">
              <div className="col-12">
                <h2 className="h3 mb-3 font-weight-normal ">
                  Sign Up As Recruiter
                </h2>
              </div>
            </div>
            <Field
              type="text"
              className="form-control mb-2"
              placeholder="First Name"
              name="firstName"
            />

            <ErrorMessage name="firstName" component={ErrorMessages} />
            <Field
              type="text"
              className="form-control mb-2"
              placeholder="Last Name"
              name="lastName"
            />

            <ErrorMessage name="lastName" component={ErrorMessages} />
            <Field
              type="email"
              className="form-control mb-2"
              placeholder="Email address"
              name="email"
            />

            <ErrorMessage name="email" component={ErrorMessages} />

            <Field
              type="password"
              className="form-control mb-2"
              placeholder="Password"
              name="password"
            />
            <div>
              <ErrorMessage name="password" component={ErrorMessages} />
            </div>

            <div>
              {auth.error ? <p style={{ color: "red" }}>{auth.error}</p> : null}
            </div>
            <button
              className="btn btn-lg btn-primary btn-block mb-3"
              type="submit"
            >
              Sign In
            </button>
            {/* <div className="mb-4">
                  <a href="#">Forget Password..?</a>
                </div> */}
          </Form>
        </Formik>
      </Modal>
    );
  };
  return (
    <>
      {SignupAsApplicantModel()}
      {SignupAsJobPosterModel()}
      {SignupAsRecruiterModel()}
    </>
  );
};

export default SignUpFunctionality;
