import express from "express";
import Job from "../../models/Job.js";
import auth from "../../middlewares/auth.js";

const router = express.Router();

// Protected route - only accessible to authenticated users with role "employer"
router.put("/jobs/:id", auth, async (req, res) => {
  const { id } = req.params;

  try {
    // Check if the job exists
    const job = await Job.findById(id);
    console.log(job)
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    
    // Check if the authenticated user is the creator of the job
    if (job.createdBy.toString() !== req.userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this job" });
    }

    // Update the job
    const updatedJob = await Job.findByIdAndUpdate(id, req.body, { new: true });
    res
      .status(200)
      .json({ message: "Job updated successfully", job: updatedJob });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export { router as updateJob };
