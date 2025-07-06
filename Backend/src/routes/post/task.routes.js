
import express from "express";
import { isUser } from "../../middleware/userAuth.middleware.js";
import upload from "../../middleware/upload.js";
import { isAdmin } from "../../middleware/adminAuth.middleware.js";
import { isAdminOrUser } from "../../middleware/isAdminOrUser.middleware.js";
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask
} from "../../controllers/task.controller.js";
import { verifyToken } from "../../middleware/verifyToken.middleware.js";

const router = express.Router();

// Example CRUD routes (replace with your actual controller functions)
router.post("/upload",verifyToken, isAdminOrUser, upload.single("attachment"), createTask);
router.get("/get",verifyToken, isAdminOrUser, getTasks);
router.get("/get/:id",verifyToken, isAdminOrUser, getTaskById);
router.put("/update/:id",verifyToken, isAdminOrUser, updateTask);
router.delete("/delete/:id",verifyToken, isAdminOrUser, deleteTask);

export default router;
