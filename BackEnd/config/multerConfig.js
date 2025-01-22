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
    const { profileImage } = req.user;
    if (profileImage) {
      const oldFile = profileImage;
      fs.unlinkSync(oldFile);
    }
    const randomName = crypto.randomBytes(16).toString("hex");
    const fileExtension = path.extname(file.originalname);
    const uniquneName = `${randomName}${fileExtension}`;

    cb(null, uniquneName);
  },
});

const upload = multer({ storage });

module.exports = upload;
