const express = require("express");
const router = express.Router();
const authVerify = require("../Controller/authVerifyController");
router.post("/verify", authVerify);
module.exports = router;
