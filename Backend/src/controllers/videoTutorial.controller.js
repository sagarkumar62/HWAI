

import VideoTutorial from "../models/videoTutorials.model.js";
import { createVideoTutorialService } from "../services/videoTutorial.service.js";


// CREATE a new video tutorial
export async function createVideoTutorial(req, res) {
  try {
    const {
      title,
      description,
      videoUrl,
      thumbnailUrl,
      duration,
      tags,
      uploadedBy,
      isPublished,
      category,
      ...rest
    } = req.body;

    // File upload (for video file)
    let videoBuffer = req.files && req.files.video ? req.files.video[0].buffer : undefined;
    // Image upload (for thumbnail)
    let thumbnailBuffer = req.files && req.files.thumbnail ? req.files.thumbnail[0].buffer : undefined;

    // If video or thumbnail is a URL, will be handled in service

    const videoTutorial = await createVideoTutorialService({
      videoBuffer,
      thumbnailBuffer,
      videoUrl,
      thumbnailUrl,
      title,
      description,
      duration,
      tags,
      uploadedBy,
      isPublished,
      category,
      ...rest
    });
    res.status(201).json({ message: "Video tutorial created successfully.", videoTutorial });
  } catch (error) {
    res.status(400).json({ message: "Video tutorial creation failed.", error: error.message });
  }
}

// GET all video tutorials
export async function getVideoTutorials(req, res) {
  try {
    const tutorials = await VideoTutorial.find().lean();
    res.status(200).json(tutorials);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch video tutorials.", error: error.message });
  }
}

// GET a single video tutorial by ID
export async function getVideoTutorialById(req, res) {
  try {
    const { id } = req.params;
    const tutorial = await VideoTutorial.findById(id).lean();
    if (!tutorial) {
      return res.status(404).json({ message: "Video tutorial not found." });
    }
    res.status(200).json(tutorial);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch video tutorial.", error: error.message });
  }
}

// UPDATE a video tutorial
export async function updateVideoTutorial(req, res) {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const tutorial = await VideoTutorial.findByIdAndUpdate(id, updateData, { new: true });
    if (!tutorial) {
      return res.status(404).json({ message: "Video tutorial not found." });
    }
    res.status(200).json({ message: "Video tutorial updated successfully.", tutorial });
  } catch (error) {
    res.status(500).json({ message: "Video tutorial update failed.", error: error.message });
  }
}

// DELETE a video tutorial
export async function deleteVideoTutorial(req, res) {
  try {
    const { id } = req.params;
    const tutorial = await VideoTutorial.findByIdAndDelete(id);
    if (!tutorial) {
      return res.status(404).json({ message: "Video tutorial not found." });
    }
    res.status(200).json({ message: "Video tutorial deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Video tutorial deletion failed.", error: error.message });
  }
}

// LIKE a video tutorial
export async function likeVideoTutorial(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const tutorial = await VideoTutorial.findById(id);
    if (!tutorial) {
      return res.status(404).json({ message: "Video tutorial not found." });
    }

    if (!tutorial.likes.includes(userId)) {
      tutorial.likes.push(userId);
      tutorial.likeCount = (tutorial.likeCount || 0) + 1;
      await tutorial.save();
      return res.status(200).json({
        message: "Video tutorial liked successfully.",
        likeCount: tutorial.likeCount,
        likedByUser: true
      });
    } else {
      return res.status(400).json({ message: "Video tutorial already liked by this user." });
    }
  } catch (error) {
    res.status(500).json({ message: "Liking video tutorial failed.", error: error.message });
  }
}

// UNLIKE a video tutorial
export async function unlikeVideoTutorial(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const tutorial = await VideoTutorial.findById(id);
    if (!tutorial) {
      return res.status(404).json({ message: "Video tutorial not found." });
    }

    if (tutorial.likes.includes(userId)) {
      tutorial.likes = tutorial.likes.filter(uid => uid.toString() !== userId);
      tutorial.likeCount = Math.max(0, (tutorial.likeCount || 1) - 1);
      await tutorial.save();
      return res.status(200).json({
        message: "Video tutorial unliked successfully.",
        likeCount: tutorial.likeCount,
        likedByUser: false
      });
    } else {
      return res.status(400).json({ message: "Video tutorial was not liked by this user." });
    }
  } catch (error) {
    res.status(500).json({ message: "Unliking video tutorial failed.", error: error.message });
  }
}

// ADD a comment to a video tutorial
export async function addCommentToVideoTutorial(req, res) {
  try {
    const { id } = req.params;
    const { text } = req.body;
    const userId = req.user.id;

    const tutorial = await VideoTutorial.findById(id);
    if (!tutorial) {
      return res.status(404).json({ message: "Video tutorial not found." });
    }

    tutorial.comments.push({ author: userId, text });
    await tutorial.save();
    res.status(201).json({ message: "Comment added successfully.", comments: tutorial.comments });
  } catch (error) {
    res.status(500).json({ message: "Failed to add comment.", error: error.message });
  }
}

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
