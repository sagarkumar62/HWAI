import CaseStudy from "../models/caseStudies.model.js";
import { createCaseStudyService } from "../services/caseStudies.service.js";

// CREATE a new case study
export async function createCaseStudy(req, res) {
  try {
    const caseStudy = await createCaseStudyService({ ...req.body });
    res.status(201).json({ message: "Case study created successfully.", caseStudy });
  } catch (error) {
    res.status(400).json({ message: "Case study creation failed.", error: error.message });
  }
}

// GET all case studies
export async function getCaseStudies(req, res) {
  try {
    const studies = await CaseStudy.find().lean();
    res.status(200).json(studies);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch case studies.", error: error.message });
  }
}

// GET a single case study by ID
export async function getCaseStudyById(req, res) {
  try {
    const { id } = req.params;
    const study = await CaseStudy.findById(id).lean();
    if (!study) {
      return res.status(404).json({ message: "Case study not found." });
    }
    res.status(200).json(study);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch case study.", error: error.message });
  }
}

// UPDATE a case study
export async function updateCaseStudy(req, res) {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const study = await CaseStudy.findByIdAndUpdate(id, updateData, { new: true });
    if (!study) {
      return res.status(404).json({ message: "Case study not found." });
    }
    res.status(200).json({ message: "Case study updated successfully.", study });
  } catch (error) {
    res.status(500).json({ message: "Case study update failed.", error: error.message });
  }
}

// DELETE a case study
export async function deleteCaseStudy(req, res) {
  try {
    const { id } = req.params;
    const study = await CaseStudy.findByIdAndDelete(id);
    if (!study) {
      return res.status(404).json({ message: "Case study not found." });
    }
    res.status(200).json({ message: "Case study deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Case study deletion failed.", error: error.message });
  }
}

// INCREMENT views
export async function incrementCaseStudyViews(req, res) {
  try {
    const { id } = req.params;
    const study = await CaseStudy.findByIdAndUpdate(
      id,
      { $inc: { viewsCount: 1 } },
      { new: true }
    ).lean();
    if (!study) {
      return res.status(404).json({ message: "Case study not found." });
    }
    res.status(200).json(study);
  } catch (error) {
    res.status(500).json({ message: "Failed to increment views.", error: error.message });
  }
}

// LIKE a case study
export async function likeCaseStudy(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const study = await CaseStudy.findById(id);
    if (!study) {
      return res.status(404).json({ message: "Case study not found." });
    }

    if (!study.likes) study.likes = [];
    if (!study.likes.includes(userId)) {
      study.likes.push(userId);
      study.likesCount = (study.likesCount || 0) + 1;
      await study.save();
      return res.status(200).json({
        message: "Case study liked successfully.",
        likesCount: study.likesCount,
        likedByUser: true
      });
    } else {
      return res.status(400).json({ message: "Case study already liked by this user." });
    }
  } catch (error) {
    res.status(500).json({ message: "Liking case study failed.", error: error.message });
  }
}

// UNLIKE a case study
export async function unlikeCaseStudy(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const study = await CaseStudy.findById(id);
    if (!study) {
      return res.status(404).json({ message: "Case study not found." });
    }

    if (study.likes && study.likes.includes(userId)) {
      study.likes = study.likes.filter(uid => uid.toString() !== userId);
      study.likesCount = Math.max(0, (study.likesCount || 1) - 1);
      await study.save();
      return res.status(200).json({
        message: "Case study unliked successfully.",
        likesCount: study.likesCount,
        likedByUser: false
      });
    } else {
      return res.status(400).json({ message: "Case study was not liked by this user." });
    }
  } catch (error) {
    res.status(500).json({ message: "Unliking case study failed.", error: error.message });
  }
}
