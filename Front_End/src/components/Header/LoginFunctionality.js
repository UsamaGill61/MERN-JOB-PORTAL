import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import ErrorMessages from "./ErrorMessages";
import { Modal } from "react-bootstrap";
import { login } from "../../actions";

const LoginFunctionality = ({ loginModel, setloginModel }) => {
  const dispatch = useDispatch();
  let auth = useSelector((state) => state.auth);

  const initialValues = {
    email: "gillusama6@gmail.com",
    password: "hshshs12345",
  };
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid Email Format")
      .required("Email is a required field"),
    password: Yup.string()
      .required("No password provided.")
    
  });
  const OnSubmitApplication = (values) => {
    const user = {
      email: values.email,
      password: values.password,
    };
    dispatch(login(user));
  };
  useEffect(() => {
    setloginModel(false);
  }, [auth.authenticate]);

  const SignupAsApplicantModel = () => {
    return (
      <Modal show={loginModel} onHide={setloginModel}>
        <Modal.Header closeButton></Modal.Header>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={OnSubmitApplication}
        >
          <Form className="form-signin mx-5">
            <div className="row text-center">
              <div className="col-12">
                <h2 className="h3 mb-3 font-weight-normal ">Login</h2>
              </div>
            </div>
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

  return <>{SignupAsApplicantModel()}</>;
};

export default LoginFunctionality;
