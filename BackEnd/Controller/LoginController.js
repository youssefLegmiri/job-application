const User = require("../models/UserModel");
const asyncErrorHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

const LoginUser = asyncErrorHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
});

module.exports = LoginUser;
