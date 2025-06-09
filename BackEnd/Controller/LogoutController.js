const asyncErrorHandler = require("express-async-handler");
const LogoutUser = asyncErrorHandler(async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  });
  res.status(200).json({ message: "You've logout successfully" });
});

module.exports = LogoutUser;
