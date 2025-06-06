const express = require("express");
const router = express.Router();
const authVerify = require("../Controller/authVerifyController");
const verifyEmail = require("../Controller/VerifyEmailController");
router.post("/verify", authVerify);
router.get("/", verifyEmail);
module.exports = router;
