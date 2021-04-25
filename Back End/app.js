const express = require("express");
const morgon = require("morgan");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanatize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const path = require("path");

const app = express();

app.use(express.json({ limit: "10kb" }));
app.use(mongoSanatize());
app.use(xss());

app.use(morgon("dev"));

app.use(cors());
app.use(helmet()); 

const limiter = rateLimit({ 
  max: 10000,
  windowMs: 60 * 60 * 1000,
  message: "Too Many requests from your IP, Please try again in 1 hour",
});
app.use("/api", limiter);

const authRouter = require("./routes/auth");
const jobPosterROuter = require("./routes/postjob");
const candidateRoutes = require("./routes/candidate")
const RecuriterRoutes = require("./routes/recuriter")

 
//static path for images
app.use("/public", express.static(path.join(__dirname, "uploads")));

app.use("/api", authRouter);  
app.use("/api", jobPosterROuter);
app.use("/api",candidateRoutes) 
app.use("/api",RecuriterRoutes)


app.all("*", (req, res, next) => {
  const err = new Error(`Cannot find ${req.originalUrl} on this server`); 
  (err.status = "fail"), (err.statusCode = 404);
 
  next(err);
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

//......... exporting app to be get imported in server.js file
module.exports = app;
