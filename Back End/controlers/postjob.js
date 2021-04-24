const JOBPOSTMODEL = require("../models/JobPostModel");
const USER = require("../models/userModel");

exports.postjob = (req, res) => {
  requiredSkills = [];
  if (req.body.requiredSkills.length > 0) {
    requiredSkills = req.body.requiredSkills.map((skills) => {
      return { skill: skills };
    });
  }
  let requiredTools = [];
  if (req.body.requiredTools.length > 0) {
    requiredTools = req.body.requiredTools.map((tools) => {
      return { tools: tools };
    });
  }

  const {
    title,
    description,
    experienceRequired,
    location,
    companyName,
    TotalPositions,
    employmentStatus,
    Role,
    Gender,
    monthlySalery,
    age,
    degreeLevel,
    lastDateToApply,
  } = req.body;
  const job = new JOBPOSTMODEL({
    createdBy: req.user._id,
    title,
    description,
    experienceRequired,
    degreeLevel,
    requiredSkills,
    requiredTools,
    location,
    companyName,
    TotalPositions,
    employmentStatus,
    Role,
    lastDateToApply,
    Gender,
    monthlySalery,
    age,
  });
  job.save((error, job) => {
    console.log(error);
    if (error) return res.json({ error });
    if (job) return res.status(201).json({ job });
  });
};

exports.getJobsPostedBySingleUser = (req, res) => {
  JOBPOSTMODEL.find({ createdBy: req.user._id })
    .select("_id createdBy title companyName Role lastDateToApply ")
    .exec((error, Jobs) => {
      if (error) {
        return res.json({ message: "Nothing Posted Yet ....." });
      }
      if (Jobs) {
        return res.status(201).json({ Jobs });
      }
    });
};

exports.getJobsDetail = (req, res) => {
  const { jobid } = req.params;
  JOBPOSTMODEL.findOne({ _id: jobid }).exec((error, JobDetail) => {
    if (error) {
      return res.json({ message: "SomeThing Went Wrong......." });
    }
    if (JobDetail) {
      return res.status(201).json({ JobDetail });
    }
  });
};

exports.getAllJobs_SearchJobs = async (req, res) => {
  const PAGE_SIZE = 5;
  const page = parseInt(req.query.page || "0");
  const total = await JOBPOSTMODEL.countDocuments({});
  const totalRegisteredUsers = await USER.countDocuments({});

  if (req.query.queryWord) {
    const fulllength = await JOBPOSTMODEL.find({
      title: { $regex: req.query.queryWord, $options: "$i" },
    });

    const Jobs = await JOBPOSTMODEL.find({
      title: { $regex: req.query.queryWord, $options: "$i" },
    })
      .limit(PAGE_SIZE)
      .skip(PAGE_SIZE * page);
    res.json({
      totalPages: Math.ceil(fulllength.length / PAGE_SIZE),
      Jobs,
      totalJobs: total,
      totalRegisteredUsers,
    });
  } else {
    const Jobs = await JOBPOSTMODEL.find({})
      .limit(PAGE_SIZE)
      .skip(PAGE_SIZE * page);

    res.json({
      totalPages: Math.ceil(total / PAGE_SIZE),
      Jobs,
      totalJobs: total,
      totalRegisteredUsers,
    });
  }
};

exports.getSingleUserDetail = async (req, res) => {
  const { Personid } = req.params;
  USER.findOne({ _id: Personid })
    .select(
      "    fatherName firstName  email  ToolsArray  SkillsArray  lastName  DegreeLevel  TargetSalery  JobTitle  CareerLevel  country  cnic  Fax  age gender maritalStatus religion mobile landline address city summery PROFILEPicture"
    )

    .exec((error, user) => {
      if (error) {
        return res.json({ message: "SomeThing Went Wrong......." });
      }
      if (user) {
        return res.status(201).json({ user });
      }
    });
};
