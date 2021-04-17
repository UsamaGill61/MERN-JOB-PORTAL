const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Canidates",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    experienceRequired: {
      type: String,
      required: true,
      trim: true,
    },

    degreeLevel: { type: String, required: true, trim: true },
    requiredSkills: [{ skill: { type: String } }],
    requiredTools: [{ tools: { type: String } }],
    location: {
      type: String,
      required: true,
      trim: true,
    },
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    TotalPositions: {
      type: Number,
      required: true,
      trim: true,
    },
    employmentStatus: {
      type: String,
      required: true,
      trim: true,
    },
    Role: {
      type: String,
      required: true,
      trim: true,
    },

    jobPosted: { type: Date, default: Date.now },
    lastDateToApply: {
      type: Date,
      required: true,
    },

    Gender: {
      type: String,
      required: true,
      trim: true,
    },
    monthlySalery: {
      type: Number,
      required: true,
      trim: true,
    },
    age: {
      type: String,
      required: true,
      trim: true,
    },
    AppliedCanidates: [
      {
        AppliedUserId: { type: mongoose.Schema.Types.ObjectId, ref: "Canidates" },
      },
    ],
  },

  { timestamps: true }
);

module.exports = mongoose.model("Jobs", jobSchema);
