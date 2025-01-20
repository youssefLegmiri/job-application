const asyncErrorHandler = require("express-async-handler");
const User = require("../models/UserModel");
const updateProfile = asyncErrorHandler(async (req, res) => {
  const { firstName } = req.body;
  if (!firstName) {
    res.status(400);
    throw new Error("Please enter all fields");
  }
  const user = await User.findByIdAndUpdate(req.user._id, {
    firstName: firstName.charAt(0).toUpperCase() + firstName.slice(1),
    profileImage: req.file?.path,
  });
  if (user) {
    res.status(200).json({ message: "Profile info saved successfully" });
  }
});
module.exports = updateProfile;
