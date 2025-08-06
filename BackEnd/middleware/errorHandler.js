const multer = require("multer");
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  // for debugging...
  console.error(err.message);
  // if the erros comes from multer
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ message: err.message });
  }

  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = errorHandler;
