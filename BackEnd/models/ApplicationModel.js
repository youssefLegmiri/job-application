const mongoose = require("mongoose");

const applicationSchema = mongoose.Schema(
  {
    userID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    jobID: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },
    status: { type: String, default: "Received" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Application", applicationSchema);
