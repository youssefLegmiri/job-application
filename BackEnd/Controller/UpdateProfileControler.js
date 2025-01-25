const asyncErrorHandler = require("express-async-handler");
const User = require("../models/UserModel");
const fs = require("fs");
const updateProfile = asyncErrorHandler(async (req, res) => {
  const { firstName, lastName } = req.body;
  const { profileImage } = req.user;

  if (profileImage) {
    const oldFile = profileImage;
    fs.unlink(oldFile, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
  const updateUserProfile = await User.findByIdAndUpdate(req.user._id, {
    profileImage: req.file?.path,
  });

  if (!firstName || !lastName) {
    res.status(400).json({ message: "Please enter all fields" });
  } else {
    const user = await User.findByIdAndUpdate(req.user._id, {
      firstName: firstName.charAt(0).toUpperCase() + firstName.slice(1),
      lastName: lastName.charAt(0).toUpperCase() + lastName.slice(1),
    });
    if (user) {
      res.status(200).json({ message: "Profile info saved successfully" });
    }
  }
});
module.exports = updateProfile;
