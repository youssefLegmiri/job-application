const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const asyncHandler = require("express-async-handler");

const checkAllFields = asyncHandler(async (req, res, next) => {
  const { firstName, lastName } = req.body;
  console.log(firstName);
  const token = req.cookies.token;
  if (!firstName || !lastName) {
    res.status(400).json({ message: "please enter all fields" });
  } else {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401).json({ message: "Invalid or expired token " });
    }
  }
});

module.exports = checkAllFields;
