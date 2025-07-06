import express from "express";
import {
  createSubStory,
  getSubStory,
  getSubStoryById,
  updateSubStory,
  deleteSubStory,
} from "../../controllers/substory.controller.js";
import { protect } from "../../middleware/protect.middleware.js";
import upload from "../../middleware/upload.js";

const router = express.Router();

// All routes below require admin privileges

router.post("/upload", protect(["admin"]), upload.single("image"), createSubStory);
router.get("/get", getSubStory);
router.get("/get/:id", getSubStoryById);
router.put("/update/:id", protect(["admin"]), updateSubStory);
router.delete("/delete/:id", protect(["admin"]), deleteSubStory);

export default router;
