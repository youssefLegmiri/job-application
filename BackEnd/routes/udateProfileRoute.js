const express = require("express");
const router = express.Router();
const upload = require("../config/multerConfig");
const protect = require("../middleware/authMiddelware");
const updateProfile = require("../Controller/UpdateProfileControler");

router.post("/", protect, upload.single("profileImage"), updateProfile);

module.exports = router;
