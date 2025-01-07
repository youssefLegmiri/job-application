const express = require("express");
const router = express.Router();
const PDFGenerator = require("../Controller/PDFController");
const protect = require("../middleware/authMiddelware");

router.post("/", protect, PDFGenerator);

module.exports = router;
