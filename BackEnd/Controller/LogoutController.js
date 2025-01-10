const asyncErrorHandler = require("express-async-handler");
const LogoutUser = asyncErrorHandler(async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  });
  res.status(200).json({ message: "User logout" });
});

module.exports = LogoutUser;
