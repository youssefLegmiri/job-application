const asyncErrorHandler = require("express-async-handler");
const User = require("../models/UserModel");
const cloudinary = require("../utils/cloudinary");
const updateProfile = asyncErrorHandler(async (req, res, next) => {
  const { firstName, lastName } = req.body;

  if (req.file) {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "profiles",
        public_id: `${req.user.firstName}_${req.user.lastName}_${req.user._id}`,
        overwrite: true, // optional: allow overwrite
        resource_type: "image",
      },
      async (err, result) => {
        if (err) return next(err);
        try {
          // Update user's data in MongoDB
          const user = await User.findByIdAndUpdate(req.user._id, {
            profileImage: result.secure_url,
            firstName: firstName.charAt(0).toUpperCase() + firstName.slice(1),
            lastName: lastName.charAt(0).toUpperCase() + lastName.slice(1),
          });
          if (user) {
            return res
              .status(200)
              .json({ message: "Profile info saved successfully" });
          }
        } catch (dbErr) {
          return next(dbErr); // Pass DB errors to error handler
        }
      }
    );

    stream.end(req.file.buffer); // Stream buffer directly
  } else {
    // No file uploaded, just update the name
    try {
      const user = await User.findByIdAndUpdate(req.user._id, {
        firstName: firstName.charAt(0).toUpperCase() + firstName.slice(1),
        lastName: lastName.charAt(0).toUpperCase() + lastName.slice(1),
      });
      if (user) {
        return res
          .status(200)
          .json({ message: "Profile info saved successfully" });
      }
    } catch (dbErr) {
      return next(dbErr);
    }
  }
});
module.exports = updateProfile;
