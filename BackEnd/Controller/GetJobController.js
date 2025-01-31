const asyncErrorHandler = require("express-async-handler");
const Job = require("../models/JobModel");
const GetJob = asyncErrorHandler(async (req, res) => {
  const jobs = await Job.find();

  if (jobs) {
    res.status(200).json(jobs);
  }
});

module.exports = GetJob;
