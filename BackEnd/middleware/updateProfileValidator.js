const { body } = require("express-validator");

const userProfileValidator = [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("Please enter your first name"),
  body("lastName").trim().notEmpty().withMessage("Please enter your last name"),
];

module.exports = userProfileValidator;
