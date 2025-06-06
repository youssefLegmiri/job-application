const asyncHandler = require("express-async-handler");

const checkAdmin = asyncHandler(async (req, res, next) => {
  const userRole = req.user.role;

  if (userRole != "admin") {
    res.status(403);
    throw new Error("Access denied, admin only !");
  }
  next();
});
module.exports = checkAdmin;
