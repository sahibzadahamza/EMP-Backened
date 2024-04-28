import JobApplication from "../../models/JobApplication.js";
import express from "express";

const router = express.Router();

// Endpoint to retrieve job applications for the current user
router.get("/user-apply", async (req, res) => {
  try {
    const userEmail = req.body.email;
    const jobApplications = await JobApplication.find({ email: userEmail });
    if (!jobApplications) {
      return res.json({ message: "No applied jobs found for the user" });
    } else {
      console.log(jobApplications);
      res.send({ jobApplications });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export { router as RetrieveuserJobs };
