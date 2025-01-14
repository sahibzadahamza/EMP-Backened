import express from "express";
import Job from "../../models/Job.js";
import auth from "../../middlewares/auth.js";

const router = express.Router();

// Protected route - only accessible to authenticated users with role "employer"
router.delete("/jobs/:id", auth, async (req, res) => {
  try {
    // Check if the job exists
    const job = await Job.findById({ _id: req.params.id });
 
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    
    // Check if the authenticated user is the creator of the job
    if (job.createdBy.toString() !== req.userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this job" });
    }

    // Delete the job
    await Job.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export { router as deleteJob };
