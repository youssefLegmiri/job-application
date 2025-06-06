const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddelware");
const CreateJob = require("../Controller/CreateJobController");
const GetJob = require("../Controller/GetJobController");
const DeleteJob = require("../Controller/DeleteJobController");
const UpdateJob = require("../Controller/UpdateJobController");
const GetSelectedJob = require("../Controller/GetSelectedJobController");
const checkAdmin = require("../middleware/CheckAdmin");

router.post("/", protect, checkAdmin, CreateJob);
router.get("/", protect, GetJob);
router.get("/:id", protect, GetSelectedJob);
router.delete("/:id", protect, checkAdmin, DeleteJob);
router.put("/:id", protect, checkAdmin, UpdateJob);

module.exports = router;
