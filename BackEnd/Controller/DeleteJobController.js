const asyncErrorHandler = require("express-async-handler");
const Job = require("../models/JobModel");
const User = require("../models/UserModel");
const Application = require("../models/ApplicationModel");
const DeleteJob = asyncErrorHandler(async (req, res) => {
  const jobID = req.params.id;

  await Application.deleteMany({ jobID: jobID });
  await User.updateMany(
    { appliedJobs: jobID },
    { $pull: { appliedJobs: jobID } }
  );
  const deletedJob = await Job.findByIdAndDelete(jobID);

  if (!deletedJob) {
    res.status(404).json({ message: "No job found" });
  } else {
    res.status(200).json({ message: "Job has been successfully deleted" });
  }
});

module.exports = DeleteJob;
