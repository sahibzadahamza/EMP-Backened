import JobApplication from "../../models/JobApplication.js";
import express from "express";

const router = express.Router();

// Endpoint to retrieve job applications for the current user
router.get("/user-apply", async (req, res) => {
  try {
    // Assuming you have middleware to extract user ID from token

    // Find job applications for the current user
    // const jobApplications = await JobApplication.find({ userId });

    if (!jobApplications || jobApplications.length === 0) {
      return res.status(404).json({ message: "No applied jobs found for the user" });
    }

    res.json({ jobApplications });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export { router as RetrieveuserJobs };
