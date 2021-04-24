const USER = require("../models/userModel");
const JOBPOSTMODEL = require("../models/JobPostModel");

const fs = require("fs");

exports.updateCandidateProfile = (req, res) => {
  let SkillsArray = [];
  if (Array.isArray(req.body.Skills)) {
    SkillsArray = req.body.Skills.map((skills) => {
      return skills;
    });
  } else if (req.body.Skills == undefined) {
    SkillsArray = [];
  } else {
    SkillsArray = [req.body.Skills];
  }

  let ToolsArray = [];
  if (Array.isArray(req.body.Tools)) {
    ToolsArray = req.body.Tools.map((tools) => {
      return tools;
    });
  } else if (req.body.Tools == undefined) {
    ToolsArray = [];
  } else {
    ToolsArray = [req.body.Tools];
  }

  const {
    _id,
    firstName,
    lastName,
    fatherName,
    cnic,
    age,
    gender,
    maritalStatus,
    religion,
    mobile,
    landline,
    address,
    city,
    Fax,
    email,
    summery,
    country,
    JobTitle,
    CareerLevel,
    TargetSalery,
    DegreeLevel,
  } = req.body;

  const candidate = {
    firstName,
    lastName,
    fatherName,
    cnic,
    age,
    gender,
    maritalStatus,
    religion,
    mobile,
    landline,
    address,
    city,
    Fax,
    email,
    summery,
    country,
    JobTitle,
    CareerLevel,
    TargetSalery,
    DegreeLevel,
    ToolsArray,
    SkillsArray,
  };

  if (req.file) {
    candidate.PROFILEPicture = req.file.filename;
    USER.find({
      _id: _id,
      PROFILEPicture: { $exists: true, $ne: null },
    }).exec((err, res) => {
      if (res.length > 0)
        fs.unlinkSync("./uploads/" + res.map((e) => e.PROFILEPicture));
    });
  }

  USER.findOneAndUpdate({ _id }, candidate, {
    new: true,
  })
    .select(
      "firstName lastName fatherName cnic age gender role maritalStatus religion mobile andline address city Fax email summery country JobTitle CareerLevel TargetSalery DegreeLevel ToolsArray SkillsArray PROFILEPicture _id"
    )
    .exec((err, data) => {
      if (err) return res.json({ err });
      if (data) return res.status(201).json({ user: data });
    });
};

exports.ApplyToTheJob = (req, response) => {
  USER.findById({ _id: req.user._id }).exec((err, res) => {
    if (err) console.log(err);
    if (res) {
      if (
        res.fatherName !== "N/A" &&
        res.cnic !== "0" &&
        res.age !== 0 &&
        res.gender !== "N/A" &&
        res.maritalStatus !== "N/A" &&
        res.religion !== "N/A" &&
        res.mobile !== "0" &&
        res.address !== "N/A" &&
        res.city !== "N/A" &&
        res.country !== "N/A" &&
        res.JobTitle !== "N/A" &&
        res.CareerLevel !== "N/A" &&
        res.TargetSalery !== "N/A" &&
        res.DegreeLevel !== "N/A" &&
        res.summery !== "N/A" &&
        res.SkillsArray.length !== 0 &&
        res.ToolsArray.length !== 0
      ) {
        JOBPOSTMODEL.find({
          _id: req.params.jobid,
          "AppliedCanidates.AppliedUserId": req.user._id,
        }).exec((err, result) => {
          if (result.length > 0) {
            response.json({ message: "You Have Already Applied For this job" });
          } else {
            JOBPOSTMODEL.findOneAndUpdate(
              { _id: req.params.jobid },
              {
                $push: {
                  AppliedCanidates: {
                    AppliedUserId: req.user._id,
                  },
                },
              }
            ).exec((err, data) => {
              if (data)
                response.json({
                  message: "You Applied For the job Successfully",
                });
            });
          }
        });
      } else {
        response.status(201).json({
          message: "Please Fill Out All Required details in Your Profile TO Apply",
        });
      }
    }
  });
};
