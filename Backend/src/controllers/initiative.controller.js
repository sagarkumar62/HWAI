import Initiative from "../models/initiative.model.js";
import { createInitiativeService } from "../services/initiative.service.js";

// Create a new initiative
export async function createInitiative(req, res) {
  try {
    let fileBuffer = req.file && req.file.buffer;
    let bannerImageUrl = req.body.bannerImage;

    // If file is uploaded, upload to ImageKit
    if (fileBuffer) {
      // Lazy import to avoid circular deps if any
      const { uploadFile } = await import("../config/imagekit.js");
      const result = await uploadFile(fileBuffer);
      bannerImageUrl = result.url;
    } else if (bannerImageUrl) {
      // If bannerImage is a URL, fetch and upload to ImageKit
      try {
        const response = await fetch(bannerImageUrl);
        if (!response.ok) throw new Error('Failed to fetch banner image from URL');
        const urlBuffer = Buffer.from(await response.arrayBuffer());
        const { uploadFile } = await import("../config/imagekit.js");
        const result = await uploadFile(urlBuffer);
        bannerImageUrl = result.url;
      } catch (err) {
        return res.status(400).json({ message: "Failed to fetch or upload banner image from URL.", error: err.message });
      }
    }

    // Pass all fields, but override bannerImage with uploaded url if present
    const initiative = await createInitiativeService({ ...req.body, bannerImage: bannerImageUrl });
    res.status(201).json({ message: "Initiative created successfully.", initiative });
  } catch (error) {
    res.status(500).json({ message: "Initiative creation failed.", error: error.message });
  }
}

// Get all initiatives
export async function getInitiatives(req, res) {
  try {
    const initiatives = await Initiative.find();
    res.status(200).json(initiatives);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch initiatives.", error: error.message });
  }
}

// Get a single initiative by ID
export async function getInitiativeById(req, res) {
  try {
    const { id } = req.params;
    const initiative = await Initiative.findById(id);
    if (!initiative) {
      return res.status(404).json({ message: "Initiative not found." });
    }
    res.status(200).json(initiative);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch initiative.", error: error.message });
  }
}

// Update an initiative
export async function updateInitiative(req, res) {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const initiative = await Initiative.findByIdAndUpdate(id, updateData, { new: true });
    if (!initiative) {
      return res.status(404).json({ message: "Initiative not found." });
    }
    res.status(200).json({ message: "Initiative updated successfully.", initiative });
  } catch (error) {
    res.status(500).json({ message: "Initiative update failed.", error: error.message });
  }
}

// Delete an initiative
export async function deleteInitiative(req, res) {
  try {
    const { id } = req.params;
    const initiative = await Initiative.findByIdAndDelete(id);
    if (!initiative) {
      return res.status(404).json({ message: "Initiative not found." });
    }
    res.status(200).json({ message: "Initiative deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Initiative deletion failed.", error: error.message });
  }
}
