import mongoose from "mongoose";
import SubStory from "../models/substory.model.js";
// import { uploadFile } from "../config/imagekit.js";
import { createSubStoryService } from "../services/substory.service.js";

// Controller: handle upload and substory creation
export async function createSubStory(req, res) {
  try {
    const { story, heading, description, image } = req.body;
    const fileBuffer = req.file && req.file.buffer;
    const imageUrl = image; // If URL provided directly

    console.log("File buffer:", !!fileBuffer);
    console.log("Image URL:", !!imageUrl);

    // Validate required fields
    if (!story || !heading || !description || (!fileBuffer && !imageUrl)) {
      return res.status(400).json({ message: "All fields are required, including either file upload or image URL." });
    }

    if (!mongoose.Types.ObjectId.isValid(story)) {
      return res.status(400).json({ message: "Invalid Story ID." });
    }

    // Proceed with creation via service
    const substory = await createSubStoryService({ fileBuffer, imageUrl, story, heading, description });

    return res.status(201).json({
      message: "SubStory created successfully",
      substory: {
        id: substory._id,
        story: substory.story,
        heading: substory.heading,
        description: substory.description,
        image: substory.image,
      },
    });
  } catch (error) {
    console.error("Error creating SubStory:", error);
    return res.status(500).json({ message: "SubStory creation failed", error: error.message });
  }
}

// Get all substories
export async function getSubStory(req, res) {
  try {
    const substories = await SubStory.find();
    res.status(200).json(substories);
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
}

// Get a single substory by ID
export async function getSubStoryById(req, res) {
  try {
    const { id } = req.params;
    const substory = await SubStory.findById(id);
    if (!substory) {
      return res.status(404).json({ message: "SubStory not found." });
    }
    res.status(200).json(substory);
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
}

// Update a substory
export async function updateSubStory(req, res) {
  try {
    const { id } = req.params;
    const { image, story, heading, description } = req.body;
    const substory = await SubStory.findByIdAndUpdate(
      id,
      { image, story, heading, description },
      { new: true }
    );
    if (!substory) {
      return res.status(404).json({ message: "SubStory not found." });
    }
    res.status(200).json({ message: "SubStory updated successfully.", substory });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
}

// Delete a substory
export async function deleteSubStory(req, res) {
  try {
    const { id } = req.params;
    const substory = await SubStory.findByIdAndDelete(id);
    if (!substory) {
      return res.status(404).json({ message: "SubStory not found." });
    }
    res.status(200).json({ message: "SubStory deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
}
