const Job = require("../models/JobModel");
const asyncErrorHandler = require("express-async-handler");

const UpdateJob = asyncErrorHandler(async (req, res) => {
  const { id } = req.params;
  const { title, location, briefDescription, salary, experience, description } =
    req.body;
  const updateJob = await Job.findByIdAndUpdate(
    id,
    {
      title,
      location,
      briefDescription,
      salary,
      experience,
      description,
    },
    { new: true }
  );
  if (updateJob) {
    res.status(200).json(updateJob);
  }
});

module.exports = UpdateJob;
