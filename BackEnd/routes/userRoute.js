const express = require("express");
const router = express.Router();
const RegisterUser = require("../Controller/userController");

router.post("/", RegisterUser);
module.exports = router;
