const User = require("../models/UserModel");
const asyncErrorHandler = require("express-async-handler");

const verifyEmail = asyncErrorHandler(async (req, res) => {
  const { token } = req.query;
  if (!token) {
    res.status(400).send("Invalid or missing token.");
  } else {
    const user = await User.findOne({
      emailVerificationToken: token,
      emailVerificationExpires: { $gt: Date.now() },
    });

    if (!user) return res.status(400).send("Token invalid or expired.");

    user.isVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;

    await user.save();
    console.log(" email Verified");
    res.send("Email verified successfully! You can now log in.");
  }
});
module.exports = verifyEmail;
