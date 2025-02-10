const asyncErrorHandler = require("express-async-handler");
const Application = require("../models/ApplicationModel");
const User = require("../models/UserModel");

const UpdateApplicationStatus = asyncErrorHandler(async (req, res) => {
  const arrayOfData = req.body;
  for (const job of arrayOfData) {
    const { jobID, updates: arrayOfUsers } = job;
    for (const { userEmail, newStatus } of arrayOfUsers) {
      const user = await User.findOne({ email: userEmail });
      if (!user) continue;
      const updatedApplication = await Application.findOneAndUpdate(
        { jobID, userID: user._id },
        { $set: { status: newStatus } },
        { new: true }
      );
    }
  }
  res.status(200).json({ message: "Data saved successfully" });
});

module.exports = UpdateApplicationStatus;
