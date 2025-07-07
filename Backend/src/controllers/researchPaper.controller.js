import mongoose from "mongoose";
import ResearchPaper from "../models/researchPaper.model.js";
import { createResearchPaperService } from "../services/researchPaper.service.js";

// CREATE a new research paper
export async function createResearchPaper(req, res) {
  try {
    const {
      title,
      abstract,
      authors,
      publicationDate,
      journal,
      doi,
      url,
      file,
      image,
      tags,
      category,
      createdBy,
      initiative,
      ...rest
    } = req.body;

    // File upload (for research paper PDF)
    let fileBuffer = req.files && req.files.file ? req.files.file[0].buffer : undefined;
    // Image upload (for cover image)
    let imageBuffer = req.files && req.files.image ? req.files.image[0].buffer : undefined;

    // If image or file is a URL, will be handled in service

    const researchPaper = await createResearchPaperService({
      fileBuffer,
      imageBuffer,
      url,
      file,
      image,
      title,
      abstract,
      authors,
      publicationDate,
      journal,
      doi,
      tags,
      category,
      createdBy,
      initiative,
      ...rest
    });
    res.status(201).json({ message: "Research paper created successfully.", researchPaper });
  } catch (error) {
    res.status(400).json({ message: "Research paper creation failed.", error: error.message });
  }
}

// GET all research papers
export async function getResearchPapers(req, res) {
  try {
    const papers = await ResearchPaper.find().lean();
    res.status(200).json(papers);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch research papers.", error: error.message });
  }
}

// GET a single research paper by ID
export async function getResearchPaperById(req, res) {
  try {
    const { id } = req.params;
    const paper = await ResearchPaper.findById(id).lean();
    if (!paper) {
      return res.status(404).json({ message: "Research paper not found." });
    }
    res.status(200).json(paper);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch research paper.", error: error.message });
  }
}

// UPDATE a research paper
export async function updateResearchPaper(req, res) {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const paper = await ResearchPaper.findByIdAndUpdate(id, updateData, { new: true });
    if (!paper) {
      return res.status(404).json({ message: "Research paper not found." });
    }
    res.status(200).json({ message: "Research paper updated successfully.", paper });
  } catch (error) {
    res.status(500).json({ message: "Research paper update failed.", error: error.message });
  }
}

// DELETE a research paper
export async function deleteResearchPaper(req, res) {
  try {
    const { id } = req.params;
    const paper = await ResearchPaper.findByIdAndDelete(id);
    if (!paper) {
      return res.status(404).json({ message: "Research paper not found." });
    }
    res.status(200).json({ message: "Research paper deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Research paper deletion failed.", error: error.message });
  }
}

// DOWNLOAD a research paper file
export async function downloadResearchPaper(req, res) {
  try {
    const { id } = req.params;
    const paper = await ResearchPaper.findById(id).lean();
    if (!paper || !paper.file) {
      return res.status(404).json({ message: "File not found" });
    }
    // Increment download count efficiently
    await ResearchPaper.findByIdAndUpdate(id, { $inc: { downloadsCount: 1 } });
    // Set appropriate headers for file download
    res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(paper.title || 'paper')}`);
    res.setHeader('Content-Type', 'application/pdf');
    // Redirect to the file URL for download (if file is a URL)
    return res.redirect(paper.file);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// GET a single research paper by ID and increment views
export async function getResearchPaperByIdWithViews(req, res) {
  try {
    const { id } = req.params;
    const paper = await ResearchPaper.findByIdAndUpdate(
      id,
      { $inc: { viewsCount: 1 } },
      { new: true }
    ).lean();
    if (!paper) {
      return res.status(404).json({ message: "Research paper not found." });
    }
    res.status(200).json(paper);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch research paper.", error: error.message });
  }
}

// LIKE a research paper
export async function likeResearchPaper(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const paper = await ResearchPaper.findById(id);
    if (!paper) {
      return res.status(404).json({ message: "Research paper not found." });
    }

    if (!paper.likes.includes(userId)) {
      paper.likes.push(userId);
      paper.likesCount = (paper.likesCount || 0) + 1;
      await paper.save();
      return res.status(200).json({
        message: "Research paper liked successfully.",
        likesCount: paper.likesCount,
        likedByUser: true
      });
    } else {
      return res.status(400).json({ message: "Research paper already liked by this user." });
    }
  } catch (error) {
    res.status(500).json({ message: "Liking research paper failed.", error: error.message });
  }
}

// UNLIKE a research paper
export async function unlikeResearchPaper(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const paper = await ResearchPaper.findById(id);
    if (!paper) {
      return res.status(404).json({ message: "Research paper not found." });
    }

    if (paper.likes.includes(userId)) {
      paper.likes = paper.likes.filter(uid => uid.toString() !== userId);
      paper.likesCount = Math.max(0, (paper.likesCount || 1) - 1);
      await paper.save();
      return res.status(200).json({
        message: "Research paper unliked successfully.",
        likesCount: paper.likesCount,
        likedByUser: false
      });
    } else {
      return res.status(400).json({ message: "Research paper was not liked by this user." });
    }
  } catch (error) {
    res.status(500).json({ message: "Unliking research paper failed.", error: error.message });
  }
}
