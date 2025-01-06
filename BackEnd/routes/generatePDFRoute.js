const express = require("express");
const router = express.Router();
const PDFGenerator = require("../Controller/PDFController");
router.post("/", PDFGenerator);

module.exports = router;
