const asyncErrorHandler = require("express-async-handler");
const Application = require("../models/ApplicationModel");
const jobApplication = asyncErrorHandler(async (req, res) => {
  const userID = req.user._id;
  const jobID = req.params.id;

  const applicationExist = await Application.findOne({
    user: userID,
    job: jobID,
  });
  if (applicationExist) {
    res
      .status(400)
      .json({ message: "You have already applied for this job !" });
  } else {
    const newApplication = await Application.create({
      user: userID,
      job: jobID,
    });

    if (newApplication) {
      res.status(200).json({
        message: "Your application has been saved successfully, Thank you !",
      });
    }
  }
});

module.exports = jobApplication;
