const asyncErrorHandler = require("express-async-handler");
const User = require("../models/UserModel");
const fs = require("fs");
const DeleteUser = asyncErrorHandler(async (req, res) => {
  const { profileImage } = req.user;

  const deletetedUser = await User.findByIdAndDelete(req.user._id);
  if (profileImage) {
    fs.unlink(profileImage, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
  if (deletetedUser) {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });
    res
      .status(200)
      .json({ message: "Your account has been deleted successfully" });
  }
});

module.exports = DeleteUser;
