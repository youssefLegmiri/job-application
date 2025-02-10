const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddelware");
const CreateJobApplication = require("../Controller/CreateJobApplicationController");
const GetApplications = require("../Controller/GetApplicationsControllers");
const UpdateApplicationStatus = require("../Controller/UpdateApplicationStatusController");

router.post("/", protect, UpdateApplicationStatus);
router.post("/:id", protect, CreateJobApplication);
router.get("/", protect, GetApplications);
module.exports = router;
