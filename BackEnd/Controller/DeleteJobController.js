const asyncErrorHandler = require("express-async-handler");
const Job = require("../models/JobModel");

const DeleteJob = asyncErrorHandler(async (req, res) => {
  const { id } = req.params;

  const deletedJob = await Job.findByIdAndDelete(id);

  if (!deletedJob) {
    res.status(404).json({ message: "No job found" });
  } else {
    res.status(200).json({ message: "Job has been successfully deleted" });
  }
});

module.exports = DeleteJob;
