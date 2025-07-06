import express from "express";
import { isAdminOrUser } from "../../middleware/isAdminOrUser.middleware.js";
import { isAdmin } from "../../middleware/adminAuth.middleware.js";
import {
  createInitiative,
  getInitiatives,
  getInitiativeById,
  updateInitiative,
  deleteInitiative
} from "../../controllers/initiative.controller.js";
import { verifyToken } from "../../middleware/verifyToken.middleware.js";

const router = express.Router();


router.post("/upload", isAdmin, createInitiative);
router.get("/get",verifyToken, isAdminOrUser, getInitiatives);
router.get("/get/:id",verifyToken, isAdminOrUser, getInitiativeById);
router.put("/update/:id", isAdmin, updateInitiative);
router.delete("/delete/:id", isAdmin, deleteInitiative);

export default router;
