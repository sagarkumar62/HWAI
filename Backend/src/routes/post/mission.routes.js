import express from "express";
import { protect } from "../../middleware/protect.middleware.js";
import upload from "../../middleware/upload.js";
import {
  createMission,
  getAllMissions,
  getMissionById,
  updateMission,
  deleteMission
} from "../../controllers/mission.controller.js";

const router = express.Router();

// Create a new mission (admin only, with image upload)
router.post("/upload", protect(["admin"]), upload.single("image"), createMission);

// Get all missions (admin and user)
router.get("/get", getAllMissions);

// Get a single mission by ID (admin and user)
router.get("/get/:id",  getMissionById);

// Update a mission (admin only, with image upload)
router.put("/update/:id", protect(["admin"]), upload.single("image"), updateMission);

// Delete a mission (admin only)
router.delete("/delete/:id", protect(["admin"]), deleteMission);

export default router;
