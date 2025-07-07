
import express from "express";
import {
  createVideoTutorial,
  getAllVideoTutorials,
  getVideoTutorialById,
  updateVideoTutorial,
  deleteVideoTutorial,
  likeVideoTutorial,
  unlikeVideoTutorial,
  addComment,
  // No replyToComment or incrementViews for videoTutorial
} from "../../controllers/videoTutorial.controller.js";
import { protect } from "../../middleware/protect.middleware.js";
import upload from "../../middleware/upload.js";

const router = express.Router();

// Create a new video tutorial
router.post("/upload", protect(["admin"]), upload.fields([
  { name: "image", maxCount: 1 },
  { name: "video", maxCount: 1 }
]), createVideoTutorial);

// Get all video tutorials
router.get("/get", getAllVideoTutorials);

// Get a single video tutorial by ID
router.get("/get/:id", getVideoTutorialById);

// Update a video tutorial
router.put("/update/:id", protect(["admin"]), upload.fields([
  { name: "image", maxCount: 1 },
]), updateVideoTutorial);

// Delete a video tutorial
router.delete("/delete/:id", protect(["admin"]), deleteVideoTutorial);

// Like a video tutorial
router.post("/:id/like", protect(["admin", "user"]), likeVideoTutorial);

// Unlike a video tutorial
router.post("/:id/unlike", protect(["admin", "user"]), unlikeVideoTutorial);

// Add a comment to a video tutorial
router.post("/:id/comments", protect(["admin", "user"]), addComment);

export default router;
