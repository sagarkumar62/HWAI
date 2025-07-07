import express from "express";
import { protect } from "../../middleware/protect.middleware.js";
import {
  createInitiative,
  getInitiatives,
  getInitiativeById,
  updateInitiative,
  deleteInitiative
} from "../../controllers/initiative.controller.js";
import upload from "../../middleware/upload.js";


const router = express.Router();



router.post("/upload", protect(["admin"]),upload.fields([
        { name: "image", maxCount: 1 }
    ]), createInitiative);
router.get("/get", getInitiatives);
router.get("/get/:id", getInitiativeById);
router.put("/update/:id", protect(["admin"]),upload.fields([
        { name: "image", maxCount: 1 }
    ]), updateInitiative);
router.delete("/delete/:id", protect(["admin"]), deleteInitiative);

export default router;
