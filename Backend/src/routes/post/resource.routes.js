import express from "express";
import { protect } from "../../middleware/protect.middleware.js";

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
import upload from "../../middleware/upload.js";

const router = express.Router();

/**
 * RESOURCE ROUTES
 */

// CREATE a new resource
router.post("/upload", protect(["admin", "user"]),upload.fields([
        { name: "image", maxCount: 1 },
        { name: "file", maxCount: 1 },
    ]), createResource);

// GET all resources
router.get("/get", getResources);

// GET a single resource by ID and increment view count
router.get("/get/:id", getResourceById);

// UPDATE a resource
router.put("/update/:id", protect(["admin", "user"]), updateResource);

// DELETE a resource
router.delete("/delete/:id", protect(["admin", "user"]), deleteResource);

// DOWNLOAD a resource and increment downloads count
router.get("/:id/download", downloadResource);

// LIKE a resource
router.post("/:id/like", protect(["admin", "user"]), likeResource);

// UNLIKE a resource
router.post("/:id/unlike", protect(["admin", "user"]), unlikeResource);

export default router;
