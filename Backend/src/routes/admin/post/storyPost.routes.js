

import express from "express";
import {
  createStory,
  getStory,
  getStoryById,
  updateStory,
  deleteStory,
} from "../../../controllers/story.controller.js";
// ...existing code...
import { isAdmin } from "../../../middleware/adminAuth.middleware.js";
import upload from "../../../middleware/upload.js";



const router = express.Router();


// All routes below require admin privileges

// Story routes
router.post("/upload", isAdmin, upload.single("image"), createStory);
router.get("/getStory", isAdmin, getStory);
router.get("/getStory/:id", isAdmin, getStoryById);
router.put("/update/:id", isAdmin, updateStory);
router.delete("/delete/:id", isAdmin, deleteStory);




export default router;
