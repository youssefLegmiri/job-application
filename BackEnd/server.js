const express = require("express");
const upload = require("./config/multerConfig");
const User = require("./models/UserModel");
const path = require("path");
const cors = require("cors");
const colors = require("colors");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = process.env.PORT;
const protect = require("./middleware/authMiddelware");

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.static(path.join(__dirname, "dist")));

app.use(express.json()); // middelware to parse incoming json data
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());

// Connecting to MongoDB
connectDB();

// serving the main app
app.get("*", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "dist", "index.html"));
});

// profileImage upload api

app.post(
  "/uploads",
  protect,
  upload.single("profileImage"),
  async (req, res) => {
    console.log(req.file);
    const user = await User.findByIdAndUpdate(req.user._id, {
      profileImage: req.file.path,
    });

    res.status(200).json({ message: "image uploaded successfully" });
  }
);
// authentication api
app.use("/api/auth", require("./routes/authVerifyRoute"));
// GeneratePDF api
app.use("/api/GeneratePDF", require("./routes/generatePDFRoute"));

//users api

app.use("/api/users", require("./routes/userRoute"));

app.use(errorHandler);

app.listen(PORT, () => console.log(`server listening on port ${PORT}...`));
