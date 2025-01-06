const express = require("express");
const router = express.Router();
const RegisterUser = require("../Controller/RegisterController");
const LoginUser = require("../Controller/LoginController");

router.post("/Register", RegisterUser);
router.post("/Login", LoginUser);
module.exports = router;
