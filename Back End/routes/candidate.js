const express = require("express");
const router = express.Router();
const {
  requireSignin,
  candidateMidelware, 
  upload,
} = require("../common-Middlewares/index");
const { updateCandidateProfile,ApplyToTheJob } = require("../controlers/candidateController");

router.post(
  "/updateCandidateProfile",
  requireSignin,
  candidateMidelware,
  upload.single("PROFILEPicture"), 
  updateCandidateProfile
);
router.post(
  "/ApplyToTheJob/:jobid",
  requireSignin,
  candidateMidelware,
  ApplyToTheJob
);

module.exports = router; 
