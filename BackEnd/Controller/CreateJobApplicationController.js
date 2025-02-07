const asyncErrorHandler = require("express-async-handler");
const Application = require("../models/ApplicationModel");
const User = require("../models/UserModel");
const CreateJobApplication = asyncErrorHandler(async (req, res) => {
  const userID = req.user._id;
  const jobID = req.params.id;

  const applicationExist = await Application.findOne({
    userID: userID,
    jobID: jobID,
  });
  if (applicationExist) {
    res
      .status(400)
      .json({ message: "You have already applied for this job !" });
  } else {
    const newApplication = await Application.create({
      userID: userID,
      jobID: jobID,
    });
    const user = await User.findByIdAndUpdate(
      userID,
      {
        $addToSet: { appliedJobs: jobID },
      },
      { new: true }
    );
    const isApplied = user.appliedJobs.includes(jobID);
    if (newApplication) {
      res.status(200).json({
        message: "Your application has been saved successfully, Thank you !",
        isApplied,
      });
    }
  }
});

module.exports = CreateJobApplication;
