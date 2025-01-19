const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const fs = require("fs");
const asyncHandler = require("express-async-handler");
const authVerify = asyncHandler(async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).json({ message: "Unauthorized user !" });
  } else {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById({ _id: decoded.id }).select("-password");

      res.status(200).json({
        firstName: user.firstName,
        lastName: user.lastName,
        profileImage: `${req.protocol}://${req.get(
          "host"
        )}/${user.profileImage.replace(/\\/g, "/")}`,
      });
    } catch (error) {
      console.log(error.message);
      res.status(401).json({ message: "Unauthorized user !" });
    }
  }
});

module.exports = authVerify;
