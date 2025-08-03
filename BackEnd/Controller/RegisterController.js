const User = require("../models/UserModel");
const asyncErrorHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const RegisterUser = asyncErrorHandler(async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  // check if the user already exist
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(409);
    throw new Error("Email already taken please choose another one ");
  } else {
    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Generate verification token
    const token = crypto.randomBytes(32).toString("hex");

    // Verification URL
    const verificationUrl = `http://localhost:5000/api/verifyEmail/?token=${token}`;

    // sending token via email

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Verify your email",
        text: `Hi ${firstName} ,
        Please click on the link bellow to verify you email.
        ${verificationUrl}
        Thanks.`,
      });

      // Create the user
      const user = await User.create({
        firstName: firstName.charAt(0).toUpperCase() + firstName.slice(1),
        lastName: lastName.charAt(0).toUpperCase() + lastName.slice(1),
        email: email,
        password: hashedPassword,
        emailVerificationToken: token,
        emailVerificationExpires: Date.now() + 3600000,
      });
      if (user) {
        res.status(201).json({
          message:
            "Registered successfully! Please check your email to verify.",
        });
      } else {
        throw new Error("Registration failed, please try again");
      }
    } catch (error) {
      next(error);
    }
  }
});

module.exports = RegisterUser;
