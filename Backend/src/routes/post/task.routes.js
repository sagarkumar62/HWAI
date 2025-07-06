
import express from "express";
import { protect } from "../../middleware/protect.middleware.js";
import upload from "../../middleware/upload.js";
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask
} from "../../controllers/task.controller.js";


const router = express.Router();

// Example CRUD routes (replace with your actual controller functions)

router.post("/upload", protect(["admin", "user"]), upload.single("attachment"), createTask);
router.get("/get", protect(["admin", "user"]), getTasks);
router.get("/get/:id", protect(["admin", "user"]), getTaskById);
router.put("/update/:id", protect(["admin", "user"]), updateTask);
router.delete("/delete/:id", protect(["admin", "user"]), deleteTask);

export default router;
