const JOBPOSTMODEL = require("../models/JobPostModel");
const USER = require("../models/userModel");

exports.getAllUsers_Search = async (req, res) => {
  const PAGE_SIZE = 5;
  const page = parseInt(req.query.page || "0");
  const total = await USER.countDocuments({ role: "Applicant" });

  if (req.query.queryWord) {
    const fulllength = await USER.find({
      JobTitle: { $regex: req.query.queryWord, $options: "$i" },
      role: { $regex: "Applicant" },
    })

      .limit(PAGE_SIZE)
      .skip(PAGE_SIZE * page);
    res.json({
      totalPages: Math.ceil(fulllength.length / PAGE_SIZE),
      Users:fulllength,
    });
  } else {
    const Users = await USER.find({ role: { $regex: "Applicant" } })
      .limit(PAGE_SIZE)
      .skip(PAGE_SIZE * page);

    res.json({
      totalPages: Math.ceil(total / PAGE_SIZE),
      Users,
    });
  }
};
