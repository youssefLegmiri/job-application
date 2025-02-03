const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddelware");
const jobApplication = require("../Controller/JobApplicationController");
router.post("/:id", protect, jobApplication);
module.exports = router;
