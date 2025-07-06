import express from "express";
import {
  createSubStory,
  getSubStory,
  getSubStoryById,
  updateSubStory,
  deleteSubStory,
} from "../../controllers/substory.controller.js";
import { isAdmin } from "../../middleware/adminAuth.middleware.js";
import upload from "../../middleware/upload.js";

const router = express.Router();

// All routes below require admin privileges
router.post("/upload", isAdmin, upload.single("image"), createSubStory);
router.get("/get", isAdmin, getSubStory);
router.get("/get/:id", isAdmin, getSubStoryById);
router.put("/update/:id", isAdmin, updateSubStory);
router.delete("/delete/:id", isAdmin, deleteSubStory);

export default router;
