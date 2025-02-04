const asyncErrorHandler = require("express-async-handler");
const Job = require("../models/JobModel");
const User = require("../models/UserModel");

const GetSelectedJob = asyncErrorHandler(async (req, res) => {
  const jobID = req.params.id;
  const userID = req.user.id;
  const user = await User.findById(userID);
  const isApplied = user.appliedJobs.includes(jobID);
  const selectedJob = await Job.findById(jobID);
  if (!selectedJob) {
    res.status(404).json({ message: "Job not found" });
  } else {
    res.status(200).json({ selectedJob, isApplied });
  }
});
module.exports = GetSelectedJob;
