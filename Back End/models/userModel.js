const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 20,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 20,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    hash_password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["Applicant", "Poster", "Recureter"],
    },
    //update canidate model
    PROFILEPicture: { img: { type: String } },

    fatherName: {
      type: String,
      trim: true,
      default: "N/A",
    },
    cnic: {
      type: String,
      trim: true,
      default: 0,
    },

 
    age: {
      type: Number,
      trim: true,
      default: 0,
    },
    gender: {
      type: String,
      trim: true,
      default: "N/A",
    },
    maritalStatus: {
      type: String,
      trim: true,
      default: "N/A",
    },
    religion: {
      type: String,
      trim: true,
      default: "N/A",
    },

    mobile: {
      type: String,
      trim: true,
      default: 0,
    },
    landline: {
      type: String,
      trim: true,
      default: 0,
    },
    address: {
      type: String,
      trim: true,
      default: "N/A",
    },
    city: {
      type: String,
      trim: true,
      default: "N/A",
    },
    Fax: {
      type: String,
      trim: true,
      default: "N/A",
    },

  
    country: {
      type: String,
      trim: true,
      default: "N/A",
    },
    JobTitle: {
      type: String,
      trim: true,
      default: "N/A",
    },
    CareerLevel: {
      type: String,
      trim: true,
      default: "N/A",
    },
    TargetSalery: {
      type: String,
      trim: true,
      default: "N/A",
    },

    SkillsArray: [],
    ToolsArray: [],
    DegreeLevel: {
      type: String,
      trim: true,  
      default: "N/A",
    },
    summery:{
      type: String,
      trim: true,  
      default: "N/A",
    }
  },
 
  { timestamps: true }
);

// userSchema.virtual("fullName").get(function () {
//   return `${this.firstName} ${this.lastName}`;
// });

userSchema.methods = {
  authenticate: async function (password) {
    return await bcryptjs.compare(password, this.hash_password);
  },
};

module.exports = mongoose.model("User", userSchema);
