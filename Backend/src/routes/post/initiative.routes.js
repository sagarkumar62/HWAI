import express from "express";
import { protect } from "../../middleware/protect.middleware.js";
import {
  createInitiative,
  getInitiatives,
  getInitiativeById,
  updateInitiative,
  deleteInitiative
} from "../../controllers/initiative.controller.js";


const router = express.Router();



router.post("/upload", protect(["admin"]), createInitiative);
router.get("/get", getInitiatives);
router.get("/get/:id", getInitiativeById);
router.put("/update/:id", protect(["admin"]), updateInitiative);
router.delete("/delete/:id", protect(["admin"]), deleteInitiative);

export default router;
