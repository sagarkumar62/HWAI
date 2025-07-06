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

    // File upload (for resource file)
    let fileBuffer = req.files && req.files.file ? req.files.file[0].buffer : undefined;
    // Image upload (for cover image)
    let imageBuffer = req.files && req.files.image ? req.files.image[0].buffer : undefined;

    // If image is a URL, will be handled in service
    // If file is a URL, will be handled in service

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
      createdBy,
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
    const resources = await Resource.find();
    res.status(200).json(resources);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch resources.", error: error.message });
  }
}

// GET a single resource by ID
export async function getResourceById(req, res) {
  try {
    const { id } = req.params;
    const resource = await Resource.findById(id);
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
    // If file/image update is supported, handle here
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
