import express from "express";
import { isAdminOrUser } from "../../middleware/isAdminOrUser.middleware.js"; // Uncomment and update if you have role-based middleware
import {
  createResource,
  getResources,
  getResourceById,
  updateResource,
  deleteResource
} from "../../controllers/resource.controller.js";
import { verifyToken } from "../../middleware/verifyToken.middleware.js";

const router = express.Router();

// CREATE a new resource
router.post("/upload",verifyToken, isAdminOrUser, createResource);

// GET all resources
router.get("/get", getResources);

// GET a single resource by ID
router.get("/get:id", getResourceById);

// UPDATE a resource
router.put("/update:id",verifyToken, isAdminOrUser, updateResource);

// DELETE a resource
router.delete("/delete:id",verifyToken, isAdminOrUser, deleteResource);

export default router;
