const express = require("express");
const router = express.Router();
const authController = require("../controlers/authController");
const auth = require("../validator/auth");

router.post(
  "/signup",
  auth.validateSignupRequest,
  auth.isRequestValidated, 
  authController.signup
);
router.post(
  "/login",
  auth.validateLoginRequest,
  auth.isRequestValidated, 
  authController.signin
);
router.post(
  "/logout",
  authController.signout
);


module.exports = router;
 