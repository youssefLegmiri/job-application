const express = require("express");
const path = require("path");
const cors = require("cors");
const colors = require("colors");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = process.env.PORT;

// Connecting to MongoDB
connectDB();
// setuping static folders
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.static(path.join(__dirname, "dist")));

app.use(express.json()); // middelware to parse incoming json data
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());

// serving the main app
app.get("*", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "dist", "index.html"));
});

// update profile api
app.use("/UpdateProfile", require("./routes/udateProfileRoute"));
// authentication api
app.use("/api/auth", require("./routes/authVerifyRoute"));
// GeneratePDF api
app.use("/api/GeneratePDF", require("./routes/generatePDFRoute"));

//users api
app.use("/api/users", require("./routes/userRoute"));
// custom error handler middlware
app.use(errorHandler);

app.listen(PORT, () => console.log(`server listening on port ${PORT}...`));
