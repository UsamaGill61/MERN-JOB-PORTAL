import React from "react";
import "./LoaderAnimation.css";
import { Modal, ModalBody } from "react-bootstrap";

const LoaderAnimation = ({ loader, setloader }) => {
  return (
    <div id="try">
      <Modal id="try" show={loader} onHide={setloader}>
        <ModalBody >
          <div className="whole-body-wrapper">
            <div className="loading">
              <div className="obj"></div>
              <div className="obj"></div>
              <div className="obj"></div>
              <div className="obj"></div>
              <div className="obj"></div>
              <div className="obj"></div>
              <div className="obj"></div>
              <div className="obj"></div>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default LoaderAnimation;
