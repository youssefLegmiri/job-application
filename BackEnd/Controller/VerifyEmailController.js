const User = require("../models/UserModel");
const asyncErrorHandler = require("express-async-handler");
const path = require("path");
const verifyEmail = asyncErrorHandler(async (req, res) => {
  const { token } = req.query;
  if (!token) {
    res
      .status(400)
      .sendFile(path.join(__dirname, "../public/invalidToken.html"));
  } else {
    const user = await User.updateOne(
      {
        emailVerificationToken: token,
        emailVerificationExpires: { $gt: Date.now() },
      },
      {
        $set: { isVerified: true },
        $unset: { emailVerificationToken: "", emailVerificationExpires: "" },
      }
    );

    if (!user) {
      return res
        .status(400)
        .sendFile(path.join(__dirname, "../public/invalidToken.html"));
    }

    res.status(200).sendFile(path.join(__dirname, "../public/verified.html"));
  }
});
module.exports = verifyEmail;
