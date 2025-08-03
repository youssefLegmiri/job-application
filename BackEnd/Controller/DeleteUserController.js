const asyncErrorHandler = require("express-async-handler");
const User = require("../models/UserModel");
const Application = require("../models/ApplicationModel");
const fs = require("fs");
const DeleteUser = asyncErrorHandler(async (req, res, next) => {
  const { profileImage, _id } = req.user;

  await Application.deleteMany({ userID: _id });
  const deletetedUser = await User.findByIdAndDelete(_id);
  if (profileImage) {
    fs.unlink(profileImage, (err) => {
      if (err) {
        next(err);
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
