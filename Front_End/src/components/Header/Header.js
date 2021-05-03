import React, { useEffect, useState } from "react";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { signout } from "../../actions";

////////////validations
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignUpFunctionality from "./SignUpFunctionality";
import LoginFunctionality from "./LoginFunctionality";
import SearchBar from "../../containers/LandingPage/SearchBar";

const Header = () => {
  let auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [signupAsApplicantModel, setsignupAsApplicantModel] = useState(false);
  const [signupAsJobPosterModel, setsignupAsJobPosterModel] = useState(false);
  const [signupAsRecruiterModel, setsignupAsRecruiterModel] = useState(false);
  const [loginModel, setloginModel] = useState(false);

  const opensidebar = (e) => {
    document.getElementById("menu").style.width = "250px";
  };
  const closesidebar = (e) => {
    document.getElementById("menu").style.width = "0px";
  };

  const RenderNonLoggedInMenu = () => {
    return (
      <>
        <div className="dropdown">
          <button
            className="btn btn-outline-warning dropdown-toggle mx-3"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Signup
          </button>
          <div
            className="dropdown-menu dropdown-menu-right"
            aria-labelledby="dropdownMenuButton"
          >
            <a
              onClick={() => {
                setsignupAsApplicantModel(true);
                closesidebar();
              }}
              className="dropdown-item"
            >
              Signup As Applicant
            </a>
            <a
              className="dropdown-item"
              onClick={() => {
                setsignupAsJobPosterModel(true);
                closesidebar();
              }}
            >
              Signup As Job Poster
            </a>
            <a
              className="dropdown-item"
              onClick={() => {
                setsignupAsRecruiterModel(true);
                closesidebar();
              }}
            >
              Signup As Recruiter
            </a>
          </div>
        </div>
        <div className="text-warning py-2 pr-3">or</div>

        <button
          className="btn btn-outline-info"
          onClick={() => {
            setloginModel(true);
            closesidebar();
          }}
        >
          Login
        </button>
      </>
    );
  };
  const RenderLoggedInMenu = () => {
    return (
      <>
        <div style={{ display: "flex" }}>
          <div className="text-warning py-2 pr-3">{`${auth.user.firstName} ${auth.user.lastName}`}</div>
          <button
            className="btn btn-outline-warning mx-3"
            onClick={() => dispatch(signout())}
          >
            LogOut
          </button>
        </div>
      </>
    );
  };
  const RenderLoggedInMenu2 = () => {
    return (
      <>
        <div >
          <div className="text-warning py-2 pr-3">{`${auth.user.firstName} ${auth.user.lastName}`}</div>
          <button
            className="btn btn-outline-warning mx-3"
            onClick={() => dispatch(signout())}
          >
            LogOut
          </button>
        </div>
      </>
    );
  };

  return (
    <div>
      <nav
        className={
          auth.authenticate
            ? "navbar navbar-expand-sm navbar-dark bg-dark "
            : "navbar navbar-expand-sm "
        }
      >
        <Link className="navbar-brand ml-2 ml-md-5" to="/">
          <h1 className="logo_css">JOBIFY</h1>
        </Link>
        <button
          class="navbar-toggler "
          type="button"
          data-toggle="collapse"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <div id="mainbox" onClick={opensidebar}>
            &#9776;
          </div>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto"></ul>
          {auth.authenticate ? RenderLoggedInMenu() : RenderNonLoggedInMenu()}
        </div>
        <div id="menu" className="sidemenu text-center">
          <a href="#" class="closebtn" onClick={closesidebar}>
            &times;
          </a>
          {auth.authenticate ? RenderLoggedInMenu2() : RenderNonLoggedInMenu()}
        </div>
      </nav>

      <SignUpFunctionality
        signupAsApplicantModel={signupAsApplicantModel}
        setsignupAsApplicantModel={setsignupAsApplicantModel}
        signupAsJobPosterModel={signupAsJobPosterModel}
        setsignupAsJobPosterModel={setsignupAsJobPosterModel}
        signupAsRecruiterModel={signupAsRecruiterModel}
        setsignupAsRecruiterModel={setsignupAsRecruiterModel}
      />
      <LoginFunctionality
        loginModel={loginModel}
        setloginModel={setloginModel}
      />
    </div>
  );
};

export default Header;
