const User = require("../models/UserModel");
const asyncErrorHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const LoginUser = asyncErrorHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "10min",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 10 * 60 * 1000,
    });
    res.status(200).json({
      firstName: user.firstName,
      lastName: user.lastName,
    });
  } else {
    res.status(400).json({ message: "Invalid Credentials" });
  }
});

module.exports = LoginUser;
