const express = require("express");
const router = express.Router();
const {
  requireSignin,
  JobPosterMiddleware,
} = require("../common-Middlewares/index");
const postjobController = require("../controlers/postjob");

router.post(
  "/postjob",
  requireSignin,
  JobPosterMiddleware,
  postjobController.postjob
);

router.get(
  "/getJobsPostedBySingleUser", 
  requireSignin,
  JobPosterMiddleware,
  postjobController.getJobsPostedBySingleUser
);
 
router.get("/getJobsDetail/:jobid", postjobController.getJobsDetail);
router.get("/getAllJobs_SearchJobs", postjobController.getAllJobs_SearchJobs);
router.get("/getSingleuserDetail/:Personid", postjobController.getSingleUserDetail);
 

module.exports = router;
