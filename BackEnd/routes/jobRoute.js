const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddelware");
const CreateJob = require("../Controller/CreateJobController");
const GetJob = require("../Controller/GetJobController");
const DeleteJob = require("../Controller/DeleteJobController");

router.post("/", protect, CreateJob);
router.get("/", protect, GetJob);
router.delete("/:id", protect, DeleteJob);

module.exports = router;
