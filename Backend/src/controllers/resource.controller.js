import Resource from "../models/resource.model.js";
import { createResourceService } from "../services/resource.service.js";

// CREATE a new resource
export async function createResource(req, res) {
    try {
        const {
            resourceType,
            title,
            description,
            category,
            resourceCategory,
            tags,
            url,
            image,
            createdBy,
            initiative,
            ...rest
        } = req.body;

        // File upload (resource file)
        let fileBuffer = req.files && req.files.file ? req.files.file[0].buffer : undefined;
        // Image upload (cover image)
        let imageBuffer = req.files && req.files.image ? req.files.image[0].buffer : undefined;

        const resource = await createResourceService({
            fileBuffer,
            imageBuffer,
            url,
            image,
            resourceType,
            title,
            description,
            category,
            resourceCategory,
            tags,
            createdBy: createdBy || req.user.id, // fallback if needed
            initiative,
            ...rest
        });

        res.status(201).json({ message: "Resource created successfully.", resource });
    } catch (error) {
        res.status(400).json({ message: "Resource creation failed.", error: error.message });
    }
}

// GET all resources
export async function getResources(req, res) {
    try {
        const resources = await Resource.find().sort({ createdAt: -1 });
        res.status(200).json(resources);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch resources.", error: error.message });
    }
}

// GET a single resource by ID and increment views
export async function getResourceById(req, res) {
    try {
        const { id } = req.params;
        const resource = await Resource.findByIdAndUpdate(
            id,
            { $inc: { viewsCount: 1 } },
            { new: true }
        );
        if (!resource) {
            return res.status(404).json({ message: "Resource not found." });
        }
        res.status(200).json(resource);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch resource.", error: error.message });
    }
}

// UPDATE a resource
export async function updateResource(req, res) {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const resource = await Resource.findByIdAndUpdate(id, updateData, { new: true });
        if (!resource) {
            return res.status(404).json({ message: "Resource not found." });
        }
        res.status(200).json({ message: "Resource updated successfully.", resource });
    } catch (error) {
        res.status(500).json({ message: "Resource update failed.", error: error.message });
    }
}

// DELETE a resource
export async function deleteResource(req, res) {
    try {
        const { id } = req.params;
        const resource = await Resource.findByIdAndDelete(id);
        if (!resource) {
            return res.status(404).json({ message: "Resource not found." });
        }
        res.status(200).json({ message: "Resource deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: "Resource deletion failed.", error: error.message });
    }
}

// DOWNLOAD a resource and increment downloadsCount
export async function downloadResource(req, res) {
    try {
        const { id } = req.params;
        const resource = await Resource.findById(id).lean();
        if (!resource) {
            return res.status(404).json({ message: "Resource not found." });
        }

        // Increment downloads count efficiently
        await Resource.findByIdAndUpdate(id, { $inc: { downloadsCount: 1 } });

        if (resource.resourceType === "URL" && resource.url) {
            // Redirect for external URL downloads
            return res.redirect(resource.url);
        } else if (resource.resourceType === "File" && resource.file) {
            // Redirect to file URL or handle direct streaming (GridFS/S3) if configured
            return res.redirect(resource.file);
        } else {
            return res.status(400).json({ message: "Resource file or URL is not available for download." });
        }
    } catch (error) {
        res.status(500).json({ message: "Download failed.", error: error.message });
    }
}


// LIKE a resource
export async function likeResource(req, res) {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const resource = await Resource.findById(id);
        if (!resource) {
            return res.status(404).json({ message: "Resource not found." });
        }

        if (!resource.likes.includes(userId)) {
            resource.likes.push(userId);
            resource.likesCount += 1; // increment likesCount
            await resource.save();
            return res.status(200).json({
                message: "Resource liked successfully.",
                likesCount: resource.likesCount,
                likedByUser: true
            });
        } else {
            return res.status(400).json({ message: "Resource already liked by this user." });
        }

    } catch (error) {
        res.status(500).json({ message: "Liking resource failed.", error: error.message });
    }
}

// UNLIKE a resource
export async function unlikeResource(req, res) {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const resource = await Resource.findById(id);
        if (!resource) {
            return res.status(404).json({ message: "Resource not found." });
        }

        if (resource.likes.includes(userId)) {
            resource.likes = resource.likes.filter(uid => uid.toString() !== userId);
            resource.likesCount = Math.max(0, resource.likesCount - 1); // prevent negative count
            await resource.save();
            return res.status(200).json({
                message: "Resource unliked successfully.",
                likesCount: resource.likesCount,
                likedByUser: false
            });
        } else {
            return res.status(400).json({ message: "Resource was not liked by this user." });
        }

    } catch (error) {
        res.status(500).json({ message: "Unliking resource failed.", error: error.message });
    }
}
