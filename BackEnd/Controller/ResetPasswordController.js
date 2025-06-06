const asyncErrorHandler = require("express-async-handler");
const User = require("../models/UserModel");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const fs = require("fs");
const bcrypt = require("bcrypt");
const ResetPassword = asyncErrorHandler(async (req, res) => {
  const { email, resetCode, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(400).json({ message: "Invalid Email !" });
  } else {
    if (resetCode) {
      if (resetCode === user.resetCode && Date.now() < user.codeExpire) {
        // hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const updatedUser = await User.findByIdAndUpdate(user._id, {
          password: hashedPassword,
        });
        if (updatedUser) {
          res
            .status(201)
            .json({ message: "Your password has been updated successfully" });
        }
      } else {
        res.status(400).json({ message: "Expired or invalid Code" });
      }
    } else {
      try {
        // send code to user's email
        const resetCode = crypto.randomInt(100000, 999999).toString();
        const codeExpire = Date.now() + 15 * 60 * 1000;
        const updatedUser = await User.findByIdAndUpdate(user._id, {
          resetCode: resetCode,
          codeExpire: codeExpire,
        });

        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
          },
        });
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: email,
          subject: "Password reset code",
          text: `Your reset code is :${resetCode}`,
        });
        res.status(200).json({ message: "Reset code sent to your email" });
      } catch (error) {
        res.status(500).json({ message: "server error" });
        console.log(error);
      }
    }
  }
});

module.exports = ResetPassword;
