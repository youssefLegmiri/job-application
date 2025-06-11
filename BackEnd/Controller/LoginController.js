const User = require("../models/UserModel");
const asyncErrorHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const LoginUser = asyncErrorHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  // check if user exist
  if (!user) {
    return res.status(403).json({ message: "User not found , please sign up" });
  }

  // 1. Check if email is verified
  if (!user.isVerified) {
    return res
      .status(401)
      .json({ message: "Please verify your email before login" });
  }

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // expired in 24 hours
    });
    res.status(200).json({
      firstName: user?.firstName,
      lastName: user?.lastName,
      role: user?.role,
      profileImage: user?.profileImage
        ? `${req.protocol}://${req.get("host")}/${user.profileImage?.replace(
            /\\/g,
            "/"
          )}`
        : "",
    });
  } else {
    res.status(400).json({ message: "Invalid Credentials" });
  }
});

module.exports = LoginUser;
