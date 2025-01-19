const multer = require("multer");
const path = require("path");
const fs = require("fs");
// setuping  multer

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const { firstName, lastName, profileImage, id } = req.user;
    if (profileImage) {
      const oldFile = profileImage;
      fs.unlinkSync(oldFile);
    }
    const uniquneName = `${firstName}_${lastName}_${id}_${file.originalname}`;

    cb(null, uniquneName);
  },
});

const upload = multer({ storage });

module.exports = upload;
