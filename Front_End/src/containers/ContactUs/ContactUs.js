import React, { Component } from 'react'
import './ContactUs.css'

export class Contactus extends Component {
    render() {
        return (
            <div className="container-fluid whole-background pb-5" id="contactus">
                <div className="container">
                <div className="row ">
                <div className="col-md-6 ml-4">
                  <div className="about-left">
                    <div className="vertical-heading">
                      <h5>Who We Are</h5>
                      <h2>
                        Get <br></br>In<strong>Touch</strong>
                     
                      </h2>
                    </div>
                  </div>
                </div>
                </div></div>
                <div className="row ">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-8">
                    <img 
                    className="img imgg-css"
                    src="/Images/ContactUs.png"
                    alt="logo"
                  />
                    </div>
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-4 pl-4 mt-5">
                   
                     <div className="row  pt-5">
                    <div className="col-1 pt-1">
                    <i className="fas fa-home icon"></i>
                    </div>
                    <div className="col-9">
                    <h1 className="home-logo-css"> Fake Address 2nd Floor, unknown location, World</h1>
                    </div>
                     </div>
                     <div className="row pt-3">
                    <div className="col-1 pt-2">
                    <i className="far fa-envelope icon"></i>
                    </div>
                    <div className="col-9">
                    <h1 className="home-logo-css pt-2"> FakePerson@gmail.com</h1>
                    </div>
                     </div>
                     <div className="row pt-3">
                    <div className="col-1">
                    <i className="fas fa-phone icon"></i>
                    </div>
                    <div className="col-9">
                    <h1 className="home-logo-css "> 
                    
                                0000 - 0000000
                               
                    </h1>
                    </div>
                     </div>
                     <div className="row pt-3">
                    <div className="col-1 pt-1">
                    <i className="fas fa-globe icon"></i>
                    </div>
                    <div className="col-9">
                    <h1 className="home-logo-css pt-2 ">www.fakewebsite.com</h1>
                    </div>
                     </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Contactus
