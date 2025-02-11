const asyncErrorHandler = require("express-async-handler");
const Application = require("../models/ApplicationModel");
const User = require("../models/UserModel");
const Job = require("../models/JobModel");

const GetUserApplications = asyncErrorHandler(async (req, res) => {
  const userID = req.user._id;
  const userApplications = await Application.find({ userID });
  let userData = [];
  for (const application of userApplications) {
    const { jobID, status } = application;
    const job = await Job.findById(jobID);
    userData.push({ jobTitle: job.title, applicationStatus: status });
  }
  if (!userApplications) {
    res.status(400).json({ message: "You have no application" });
  } else {
    res.status(200).json(userData);
  }
});

module.exports = GetUserApplications;
