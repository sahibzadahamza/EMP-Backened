import JobApplication from "../../models/JobApplication.js";
import express from "express";

const router = express.Router();
// Endpoint to retrieve all applied users
router.get("/applied-users", async (req, res) => {
  try {
    // Find all job applications
    const jobApplications = await JobApplication.find();

    // If no job applications found, return an empty array
    if (!jobApplications || jobApplications.length === 0) {
      return res.status(404).json({ message: "No applied users found" });
    }

    // Return the list of job applications
    res.json({ jobApplications });
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export { router as RetrieveAppliedJobs };
