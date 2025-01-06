const User = require("../models/UserModel");
const asyncErrorHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const RegisterUser = asyncErrorHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // check if all user inputs are not empty

  if (!firstName || !lastName || !email || !password) {
    res.status(400);
    throw new Error("Please enter all fields");
  }

  // check if the user already exist
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(409);
    throw new Error("Email already taken please choose another one ");
  }
  // hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: hashedPassword,
  });
  if (user) {
    res.status(201).json({ message: "operation was successful" });
  } else {
    throw new Error("DataBase Error");
  }
});

module.exports = RegisterUser;
