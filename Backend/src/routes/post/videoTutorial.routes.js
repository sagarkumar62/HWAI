
import express from "express";
import {
  createVideoTutorial,
  getVideoTutorials,
  getVideoTutorialById,
  updateVideoTutorial,
  deleteVideoTutorial,
  likeVideoTutorial,
  unlikeVideoTutorial,
  addCommentToVideoTutorial,
  deleteCommentFromVideoTutorial
} from "../../controllers/videoTutorial.controller.js";

// Import authentication middleware if needed

import { protect } from "../../middleware/protect.middleware.js";

const router = express.Router();


// Create a new video tutorial (admin or user)
router.post("/upload", protect(["admin"]), createVideoTutorial);

// Get all video tutorials (public)
router.get("/get", getVideoTutorials);

// Get a single video tutorial by ID (public)
router.get("/get/:id", getVideoTutorialById);

// Update a video tutorial (admin or user)
router.put("/update/:id", protect(["admin"]), updateVideoTutorial);

// Delete a video tutorial (admin or user)
router.delete("/update/:id", protect(["admin"]), deleteVideoTutorial);

// Like a video tutorial (any authenticated user)
router.post("/:id/like", protect(["admin", "user"]), likeVideoTutorial);

// Unlike a video tutorial (any authenticated user)
router.post("/:id/unlike", protect(["admin", "user"]), unlikeVideoTutorial);

// Add a comment to a video tutorial (any authenticated user)
router.post("/:id/comments", protect(["admin", "user"]), addCommentToVideoTutorial);

// Delete a comment from a video tutorial (any authenticated user)
router.delete("/:id/comments/:commentId", protect(["admin", "user"]), deleteCommentFromVideoTutorial);

export default router;
