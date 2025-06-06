const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    res.status(403).json({ message: "No token provided" });
  } else {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select("-password");
      if (!user) throw new Error("No user found");
      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({ message: "Invalid or expired token " });
    }
  }
});

module.exports = protect;
