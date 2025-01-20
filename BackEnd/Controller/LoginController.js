const User = require("../models/UserModel");
const asyncErrorHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const LoginUser = asyncErrorHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
    });
    res.status(200).json({
      firstName: user.firstName,
      lastName: user.lastName,
      profileImage: `${req.protocol}://${req.get(
        "host"
      )}/${user.profileImage?.replace(/\\/g, "/")}`,
    });
  } else {
    res.status(400).json({ message: "Invalid Credentials" });
  }
});

module.exports = LoginUser;
