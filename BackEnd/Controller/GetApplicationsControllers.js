const asyncErrorHandler = require("express-async-handler");
const Application = require("../models/ApplicationModel");

const GetApplications = asyncErrorHandler(async (req, res) => {
  const applications = await Application.aggregate([
    {
      $lookup: {
        from: "jobs",
        localField: "jobID",
        foreignField: "_id",
        as: "job",
      },
    },
    { $unwind: "$job" },
    {
      $lookup: {
        from: "users",
        localField: "userID",
        foreignField: "_id",
        as: "user",
      },
    },
    { $unwind: "$user" },
    {
      $group: {
        _id: "$jobID",
        jobReference: { $first: "$job.reference" },
        jobTitle: { $first: "$job.title" },
        applicants: {
          $push: {
            firstName: "$user.firstName",
            lastName: "$user.lastName",
            email: "$user.email",
            status: "$status",
          },
        },
      },
    },
    {
      $project: {
        _id: 1,
        jobReference: 1,
        jobTitle: 1,
        applicants: 1,
      },
    },
  ]);

  res.status(200).json(applications);
});

module.exports = GetApplications;
