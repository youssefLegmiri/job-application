const User = require("../models/UserModel");
const asyncErrorHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const LoginUser = asyncErrorHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res
      .status(200)
      .json({
        firstName: user.firstName,
        lastName: user.lastName,
        token: generateToken(user._id),
      });
  } else {
    res.status(400).json({ message: "Invalid Credentials" });
  }
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "10min",
  });
};

module.exports = LoginUser;
