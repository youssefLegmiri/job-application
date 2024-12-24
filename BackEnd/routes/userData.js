const express = require("express");
const route = express.Router();
const PDFGenerator = require("../Controller/PDFController");
route.post("/", (req, res) => {
  res.status(200);
  PDFGenerator(req.body, res);
});

module.exports = route;
