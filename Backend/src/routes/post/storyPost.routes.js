

import express from "express";
import {
  createStory,
  getStory,
  getStoryById,
  updateStory,
  deleteStory,
} from "../../controllers/story.controller.js";
// ...existing code...
import { protect } from "../../middleware/protect.middleware.js";
import upload from "../../middleware/upload.js";



const router = express.Router();


// All routes below require admin privileges

// Story routes

router.post("/upload", protect(["admin"]), upload.single("image"), createStory);
router.get("/getStory", getStory);
router.get("/getStory/:id", getStoryById);
router.put("/update/:id", protect(["admin"]), updateStory);
router.delete("/delete/:id", protect(["admin"]), deleteStory);




export default router;
