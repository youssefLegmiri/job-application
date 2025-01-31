const Job = require("../models/JobModel");
const asyncErrorHandler = require("express-async-handler");

const CreateJob = asyncErrorHandler(async (req, res) => {
  const { title, location, salary, description } = req.body;

  if (!title || !location || !salary || !description) {
    res.status(400).json({ message: "Please enter all fields" });
  } else {
    const job = await Job.create({
      title,
      location,
      salary,
      description,
    });
    if (job) {
      res
        .status(201)
        .json({ message: "Job has been added successfully", data: job });
    }
  }
});

module.exports = CreateJob;
