const express = require("express");
const router = express.Router();
const upload = require("../config/multerConfig");
const protect = require("../middleware/authMiddelware");
const updateProfile = require("../Controller/UpdateProfileControler");
const userProfileValidator = require("../middleware/updateProfileValidator");
const validatiorResult = require("../middleware/validatorResult");

router.post(
  "/",
  protect,
  upload.single("profileImage"),
  userProfileValidator,
  validatiorResult,
  updateProfile
);

module.exports = router;
