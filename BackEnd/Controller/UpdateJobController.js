const Job = require("../models/JobModel");
const asyncErrorHandler = require("express-async-handler");

const UpdateJob = asyncErrorHandler(async (req, res) => {
  const { id } = req.params;
  const { title, location, briefDescription, salary, description } = req.body;
  const updateJob = await Job.findByIdAndUpdate(id, {
    title,
    location,
    briefDescription,
    salary,
    description,
  });
  if (updateJob) {
    res.status(200).json(updateJob);
  }
});

module.exports = UpdateJob;
