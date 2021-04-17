const USER = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

exports.signup = async (req, res) => { 
  USER.findOne({ email: req.body.email }).exec(async (err, user) => {
    if (user)
      return res.status(200).json({
        message: "User already registered with this email",
      });
    const { firstName, lastName, email, password, role } = req.body;
    const hash_password = await bcryptjs.hash(password, 10);
    const _user = new USER({
      firstName,
      lastName,
      email,
      hash_password,
      role: role,
    }); 
    _user.save((err, user) => {
      if (err) {
        console.log(err)
        return res.json({
          message: "Something went wrong", 
        });
      }
      if (user) {
        const token = jwt.sign(
          { _id: user._id, role: user.role },
          process.env.JWT_SECRET,
          {
            expiresIn: "7d",
          }
        );
        // const { _id, firstName, lastName, email, role } = user;
        res.cookie("token", token, { expiresIn: "7d" });
        res.status(201).json({
          token,
          user 
        });
      }
    });
  });
};

exports.signin = (req, res) => {
  USER.findOne({ email: req.body.email }).exec(async (error, user) => {
    if (error) return res.status(400).json({ message: "errr" });
    if (user) {
      const isPassword = await user.authenticate(req.body.password); 
      if (isPassword) {
        const token = jwt.sign(
          { _id: user._id, role: user.role }, 
          process.env.JWT_SECRET,
          {
            expiresIn: "7d",
          }
        );
        // const { _id, firstName, lastName, email, role } = user;
        res.cookie("token", token, { expiresIn: "7d" });
        res.status(201).json({
          token,
          user
        });
      } else {
        return res.json({ message: "Invalid Credentials" });
      }
    } else {
      return res.json({ message: "Invalid email" });
    }
  });
};

exports.signout = (req, res) => { 
  res.clearCookie("token");
  res.status(200).json({
    message: "Signout successfully......!",
  });
};
