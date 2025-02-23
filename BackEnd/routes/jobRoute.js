const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddelware");
const CreateJob = require("../Controller/CreateJobController");
const GetJob = require("../Controller/GetJobController");
const DeleteJob = require("../Controller/DeleteJobController");
const UpdateJob = require("../Controller/UpdateJobController");
const GetSelectedJob = require("../Controller/GetSelectedJobController");

router.post("/", protect, CreateJob);
router.get("/", GetJob);
router.get("/:id", protect, GetSelectedJob);
router.delete("/:id", protect, DeleteJob);
router.put("/:id", protect, UpdateJob);

module.exports = router;
