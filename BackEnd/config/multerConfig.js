const multer = require("multer");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
// setuping  multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    //const { profileImage } = req.user;
    //fileSize = req.headers["content-length"];
    const randomName = crypto.randomBytes(16).toString("hex");
    const fileExtension = path.extname(file.originalname);
    const uniquneName = `${randomName}${fileExtension}`;
    const filePath = `uploads\\${uniquneName}`;
    req.on("aborted", () => {
      console.log(filePath);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
        }
      });
    });
    cb(null, uniquneName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    // validation
    cb(null, true);
  },
});

module.exports = upload;
