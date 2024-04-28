import JobApplication from "../../models/JobApplication.js";
import express from "express";

const router = express.Router();

// Endpoint to retrieve job applications for the current user
router.get("/user-apply", async (req, res) => {
  try {
    const userEmail = req.query.email; // Retrieve email from query parameters
    const jobApplications = await JobApplication.find({ email: userEmail });
    if (!jobApplications || jobApplications.length === 0) {
      return res.json({ message: "No applied jobs found for the user" });
    } else {
      console.log(jobApplications);
      res.json({ jobApplications });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export { router as RetrieveuserJobs };
