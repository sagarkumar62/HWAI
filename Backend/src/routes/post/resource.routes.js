import express from "express";
import { verifyToken } from "../../middleware/verifyToken.middleware.js";
import { isAdminOrUser } from "../../middleware/isAdminOrUser.middleware.js";

import {
    createResource,
    getResources,
    getResourceById,
    updateResource,
    deleteResource,
    downloadResource,
    likeResource,
    unlikeResource
} from "../../controllers/resource.controller.js";

const router = express.Router();

/**
 * RESOURCE ROUTES
 */

// CREATE a new resource
router.post("/upload", verifyToken, isAdminOrUser, createResource);

// GET all resources
router.get("/get", getResources);

// GET a single resource by ID and increment view count
router.get("/get/:id", getResourceById);

// UPDATE a resource
router.put("/update/:id", verifyToken, isAdminOrUser, updateResource);

// DELETE a resource
router.delete("/delete/:id", verifyToken, isAdminOrUser, deleteResource);

// DOWNLOAD a resource and increment downloads count
router.get("/:id/download", downloadResource);

// LIKE a resource
router.post("/:id/like", verifyToken, likeResource);

// UNLIKE a resource
router.post("/:id/unlike", verifyToken, unlikeResource);

export default router;
