const express = require("express");
const path = require("path");
const cors = require("cors");
const colors = require("colors");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");
const app = express();
const PORT = process.env.PORT;

app.use(express.static(path.join(__dirname, "dist")));

app.use(express.json()); // middelware to parse incoming json data
app.use(cors());

// Connecting to MongoDB
connectDB();
// serving the main app
app.get("*", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "dist", "index.html"));
});

// GeneratePDF api
app.use("/api/GeneratePDF", require("./routes/generatePDFRoute"));

//RegisterUser api

app.use("/api/Register", require("./routes/userRoute"));

app.use(errorHandler);

app.listen(PORT, () => console.log(`server listening on port ${PORT}...`));
