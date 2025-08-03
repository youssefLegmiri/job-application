const { validationResult } = require("express-validator");

const validatorResult = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Invalid input data. Please check your submission.",
    });
  }
  next();
};
module.exports = validatorResult;
