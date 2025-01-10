const express = require("express");
const router = express.Router();
const RegisterUser = require("../Controller/RegisterController");
const LoginUser = require("../Controller/LoginController");
const LogoutUser = require("../Controller/LogoutController");

router.post("/Register", RegisterUser);
router.post("/Login", LoginUser);
router.post("/Logout", LogoutUser);
module.exports = router;
