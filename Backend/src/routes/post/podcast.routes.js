import express from "express";
import {
  createPodcast,
  getAllPodcasts,
  getPodcastById,
  updatePodcast,
  deletePodcast,
  likePodcast,
  unlikePodcast,
  addComment,
  replyToComment,
  incrementViews,
} from "../../controllers/podcast.controller.js";
import {protect} from "../../middleware/protect.middleware.js";

const router = express.Router();


// Create a new podcast
router.post("/upload", protect(["admin"]), createPodcast);

// Get all podcasts
router.get("/get", getAllPodcasts);

// Get a single podcast by ID
router.get("/get/:id", getPodcastById);

// Update a podcast
router.put("/update/:id", protect(["admin"]), updatePodcast);

// Delete a podcast
router.delete("/delete/:id", protect(["admin"]), deletePodcast);

// Like a podcast
router.post("/:id/like", protect, likePodcast);

// Unlike a podcast
router.post("/:id/unlike", protect, unlikePodcast);

// Add a comment to a podcast
router.post("/:id/comments", protect, addComment);

// Reply to a comment
router.post("/:id/comments/reply", protect, replyToComment);

// Increment podcast views
router.post("/:id/views", incrementViews);

export default router;
