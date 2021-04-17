const jwt = require("jsonwebtoken"); 
const multer = require("multer");
const shortid = require('shortid')


// ......................for file storage.........................
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },  
    filename: function (req, file, cb) {
      cb(null, shortid.generate() + '-' + file.originalname)
    }
  })
   
  exports.upload = multer({ storage: storage })
// ......................for file storage.........................
  


exports.requireSignin = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
  } else {
    return res.status(400).json({ message: "Authorization required" });
  } 
  next();
};  

exports.JobPosterMiddleware = (req, res, next) => { 
  if (!req.user.role === "Poster") {
    return res.status(400).json({ message: "Access denied" });
  }
  next();
};
exports.candidateMidelware = (req, res, next) => { 
  if (!req.user.role === "Applicant") {
    return res.status(400).json({ message: "Access denied" });
  }
  next();
};


exports.adminMiddleware = (req, res, next) => {

  if (req.user.role !== "admin") {
    return res.status(400).json({ message: "Admin access denied" });
  }
  next();
};
