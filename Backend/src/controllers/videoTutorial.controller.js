
import VideoTutorial from "../models/videoTutorials.model.js";
import { createVideoTutorialService } from "../services/videoTutorial.service.js";

// Create a new video tutorial
export const createVideoTutorial = async (req, res) => {
  try {
    const videoBuffer = req.files?.video?.[0]?.buffer;
    const thumbnailBuffer = req.files && req.files.image ? req.files.image[0].buffer : undefined;

    const videoTutorial = await createVideoTutorialService({
      ...req.body,
      videoBuffer,
      thumbnailBuffer,
    });

    res.status(201).json(videoTutorial);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Get all video tutorials
export const getAllVideoTutorials = async (req, res) => {
  try {
    const tutorials = await VideoTutorial.find().populate("uploadedBy", "name").sort({ createdAt: -1 });
    res.status(200).json(tutorials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single video tutorial by ID
export const getVideoTutorialById = async (req, res) => {
  try {
    const tutorial = await VideoTutorial.findById(req.params.id).populate("uploadedBy", "name");
    if (!tutorial) return res.status(404).json({ message: "Video tutorial not found" });
    res.status(200).json(tutorial);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a video tutorial
export const updateVideoTutorial = async (req, res) => {
  try {
    const tutorial = await VideoTutorial.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!tutorial) return res.status(404).json({ message: "Video tutorial not found" });
    res.status(200).json(tutorial);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a video tutorial
export const deleteVideoTutorial = async (req, res) => {
  try {
    const tutorial = await VideoTutorial.findByIdAndDelete(req.params.id);
    if (!tutorial) return res.status(404).json({ message: "Video tutorial not found" });
    res.status(200).json({ message: "Video tutorial deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Like a video tutorial
export const likeVideoTutorial = async (req, res) => {
  try {
    const tutorial = await VideoTutorial.findById(req.params.id);
    if (!tutorial) return res.status(404).json({ message: "Video tutorial not found" });
    if (!tutorial.likes) tutorial.likes = [];
    if (!tutorial.likes.some((id) => id.toString() === req.user._id.toString())) {
      tutorial.likes.push(req.user._id);
      tutorial.likesCount = tutorial.likes.length;
      await tutorial.save();
    }
    res.status(200).json({ likesCount: tutorial.likesCount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Unlike a video tutorial
export const unlikeVideoTutorial = async (req, res) => {
  try {
    const tutorial = await VideoTutorial.findById(req.params.id);
    if (!tutorial) return res.status(404).json({ message: "Video tutorial not found" });
    if (tutorial.likes && tutorial.likes.some((id) => id.toString() === req.user._id.toString())) {
      tutorial.likes = tutorial.likes.filter((id) => id.toString() !== req.user._id.toString());
      tutorial.likesCount = tutorial.likes.length;
      await tutorial.save();
    }
    res.status(200).json({ likesCount: tutorial.likesCount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Add a comment to a video tutorial
export const addComment = async (req, res) => {
  try {
    const { content } = req.body;
    const tutorial = await VideoTutorial.findById(req.params.id);
    if (!tutorial) return res.status(404).json({ message: "Video tutorial not found" });
    const comment = {
      content,
      author: req.user._id,
      videoTutorial: tutorial._id,
      replies: [],
    };
    tutorial.comments.push(comment);
    await tutorial.save();
    res.status(201).json(tutorial.comments[tutorial.comments.length - 1]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE a comment from a video tutorial
export async function deleteCommentFromVideoTutorial(req, res) {
  try {
    const { id, commentId } = req.params;
    const userId = req.user.id;

    const tutorial = await VideoTutorial.findById(id);
    if (!tutorial) {
      return res.status(404).json({ message: "Video tutorial not found." });
    }

    const comment = tutorial.comments.id(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found." });
    }
    if (comment.author.toString() !== userId) {
      return res.status(403).json({ message: "You are not authorized to delete this comment." });
    }
    comment.remove();
    await tutorial.save();
    res.status(200).json({ message: "Comment deleted successfully.", comments: tutorial.comments });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete comment.", error: error.message });
  }
}
