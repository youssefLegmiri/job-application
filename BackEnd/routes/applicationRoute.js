const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddelware");
const CreateJobApplication = require("../Controller/CreateJobApplicationController");
const GetApplications = require("../Controller/GetApplicationsControllers");
const UpdateApplicationStatus = require("../Controller/UpdateApplicationStatusController");
const GetUserApplications = require("../Controller/GetUserApplicationsController");

router.post("/", protect, UpdateApplicationStatus);
router.post("/:id", protect, CreateJobApplication);
router.get("/", protect, GetApplications);
router.get("/userApplications", protect, GetUserApplications);
module.exports = router;
