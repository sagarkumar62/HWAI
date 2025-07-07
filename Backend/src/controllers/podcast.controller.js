

import Podcast from "../models/podcast.model.js";
import { createPodcastService } from "../services/podcast.service.js";
import mongoose from "mongoose";

// Create a new podcast
export const createPodcast = async (req, res) => {
  try {
    const videoBuffer = req.files?.video?.[0]?.buffer;
    const thumbnailBuffer = req.files && req.files.image ? req.files.image[0].buffer : undefined;

    const podcast = await createPodcastService({
      ...req.body,
      videoBuffer,
      thumbnailBuffer,
    });

    res.status(201).json(podcast);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Get all podcasts
export const getAllPodcasts = async (req, res) => {
  try {
    const podcasts = await Podcast.find().populate("uploadedBy", "name").sort({ createdAt: -1 });
    res.status(200).json(podcasts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single podcast by ID
export const getPodcastById = async (req, res) => {
  try {
    const podcast = await Podcast.findById(req.params.id).populate("uploadedBy", "name");
    if (!podcast) return res.status(404).json({ message: "Podcast not found" });
    res.status(200).json(podcast);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a podcast
export const updatePodcast = async (req, res) => {
  try {
    const podcast = await Podcast.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!podcast) return res.status(404).json({ message: "Podcast not found" });
    res.status(200).json(podcast);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a podcast
export const deletePodcast = async (req, res) => {
  try {
    const podcast = await Podcast.findByIdAndDelete(req.params.id);
    if (!podcast) return res.status(404).json({ message: "Podcast not found" });
    res.status(200).json({ message: "Podcast deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Like a podcast
export const likePodcast = async (req, res) => {
  try {
    const podcast = await Podcast.findById(req.params.id);
    if (!podcast) return res.status(404).json({ message: "Podcast not found" });
    if (!podcast.likes) podcast.likes = [];
    if (!podcast.likes.some((id) => id.toString() === req.user._id.toString())) {
      podcast.likes.push(req.user._id);
      podcast.likesCount = podcast.likes.length;
      await podcast.save();
    }
    res.status(200).json({ likesCount: podcast.likesCount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Unlike a podcast
export const unlikePodcast = async (req, res) => {
  try {
    const podcast = await Podcast.findById(req.params.id);
    if (!podcast) return res.status(404).json({ message: "Podcast not found" });
    if (podcast.likes && podcast.likes.some((id) => id.toString() === req.user._id.toString())) {
      podcast.likes = podcast.likes.filter((id) => id.toString() !== req.user._id.toString());
      podcast.likesCount = podcast.likes.length;
      await podcast.save();
    }
    res.status(200).json({ likesCount: podcast.likesCount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a comment to a podcast
export const addComment = async (req, res) => {
  try {
    const { content } = req.body;
    const podcast = await Podcast.findById(req.params.id);
    if (!podcast) return res.status(404).json({ message: "Podcast not found" });
    const comment = {
      content,
      author: req.user._id,
      podcast: podcast._id,
      replies: [],
    };
    podcast.comments.push(comment);
    await podcast.save();
    res.status(201).json(podcast.comments[podcast.comments.length - 1]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Reply to a comment
export const replyToComment = async (req, res) => {
  try {
    const { content, commentId } = req.body;
    const podcast = await Podcast.findById(req.params.id);
    if (!podcast) return res.status(404).json({ message: "Podcast not found" });
    const comment = podcast.comments.id(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });
    const reply = {
      content,
      author: req.user._id,
      podcast: podcast._id,
      replies: [],
    };
    comment.replies.push(reply);
    await podcast.save();
    res.status(201).json(reply);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Increment podcast views
export const incrementViews = async (req, res) => {
  try {
    const podcast = await Podcast.findByIdAndUpdate(
      req.params.id,
      { $inc: { viewsCount: 1 } },
      { new: true }
    );
    if (!podcast) return res.status(404).json({ message: "Podcast not found" });
    res.status(200).json({ viewsCount: podcast.viewsCount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

