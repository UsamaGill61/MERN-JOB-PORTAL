const express = require("express");
const router = express.Router();
const {
  requireSignin,
  RecureterMiddleware,
} = require("../common-Middlewares/index");
const RECURITERCONTROLER = require("../controlers/recuriter");

router.get(
  "/getAllUsers_SearchJobs",
  requireSignin,
  RecureterMiddleware,
  RECURITERCONTROLER.getAllUsers_Search
);
// router.get("/getSingleuserDetail/:Personid", postjobController.getSingleUserDetail);

module.exports = router;
