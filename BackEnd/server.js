const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
const userRoute = require("./routes/userData");
const PORT = process.env.PORT;

app.use(express.static(path.join(__dirname, "dist")));

app.use(express.json()); // middelware to parse incoming json data
app.use(cors());

// serving the main app
app.get("*", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "dist", "index.html"));
});

// post api
app.use("/formData", userRoute);

app.listen(PORT, () => console.log(`server listening on port ${PORT}...`));
