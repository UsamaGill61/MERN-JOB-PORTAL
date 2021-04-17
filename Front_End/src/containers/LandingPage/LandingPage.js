import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import JobsSection from "./JobsSection";
import "./LandingPage.css";
import ContactUs from "../ContactUs/ContactUs";
import Footer from "../Footer/Footer";

const LandingPage = () => {
  const initialData = useSelector((state) => state.initialData);

  return (
    <>
      <div>
        <div id="home">
          <video autoPlay loop muted className="bg-css">
            <source src="../video/bg.mp4" />
            <source src="../video/bg.ogv" />
            <source src="../video/bg.webm" />
          </video>
          <div className="overlay-bg"></div>
          <div className="home-content text-center">
            <div className="home-content-inner">
              <div className="home-headings">
                <h1 className="heading-1">
                  Jo<span>b</span>i<span>f</span>y
                </h1>
                <h1 className="heading-2">
                  Best <span>Job Plateform</span>
                </h1>
              </div>
              <div className="home-text">
                <p>
                  “ People don't buy what you do; People buy why you do it .. "
                </p>
              </div>
              <div className="home-btn">
                <a
                  className="btn btn-general btn-home"
                  role="button"
                  href="#jobsection"
                  title="Start Now"
                >
                  Start Now
                </a>
              </div>
            </div>
          </div>

          <a href="#jobsection" className="arrow-down">
            <i className="fa fa-angle-down"></i>
          </a>
        </div>

        <div className="about-section-2 " id="team">
          <div className="container pb-5">
            <div className="row text-center mx-5">
              <div className="col-6 text-white p-3 bg-danger">
                Total Jobs Available &nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {initialData.totalJobs}
              </div>
              <div className="col-6 text-white p-3 bg-info">
                Total Registered Users &nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {initialData.totalRegisteredUsers}
              </div>
            </div>
          </div>
          <div className="content-box-md">
            <div className="container ">
              <div className="row px-2">
                <div className="col-md-4 pb-3">
                  <div className="about-item text-center">
                    <i className="fas fa-fingerprint"></i>
                    <h3 className="pt-2">Professional Identification</h3>
                    <hr />
                    <p>
                      Create your online resume and make it available to All .
                    </p>
                  </div>
                </div>
                <div className="col-md-4 pb-3">
                  <div className="about-item text-center">
                    <i className="fas fa-search-location"></i>
                    <h3 className="pt-2">Discover Jobs </h3>
                    <hr />
                    <p>Single stop shop accross the world for Jobs.</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="about-item text-center">
                    <i className="far fa-hand-pointer"></i>
                    <h3 className="pt-2">Apply on the GO</h3>
                    <hr />
                    <p>Apply with a click of button in a few seconds.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="jobsection">
        <JobsSection />
      </div>

      <ContactUs />
      <Footer />
    </>
  );
};

export default LandingPage;
