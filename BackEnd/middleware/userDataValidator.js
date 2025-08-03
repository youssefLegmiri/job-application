const { body } = require("express-validator");

const userDataValidator = [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("Please enter your first name"),
  body("lastName").trim().notEmpty().withMessage("Please enter your last name"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Please enter your email")
    .isEmail()
    .withMessage("Invalid Email"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
];

module.exports = userDataValidator;
