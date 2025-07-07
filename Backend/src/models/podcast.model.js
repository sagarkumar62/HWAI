import mongoose from "mongoose";

// Inline Comment Schema for Podcast
const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    podcast: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Podcast",
      required: true,
    },
    replies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

// Podcast Schema
const podcastSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    video: {
      type: String,
      required: true,
    },
    thumbnailUrl: {
      type: String,
    },
    duration: {
      type: Number, // duration in seconds
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }],
    likesCount: {
      type: Number,
      default: 0,
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
    comments: [commentSchema], // Directly embed comments here
    isPublished: {
      type: Boolean,
      default: false,
    },
    publishedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Podcast", podcastSchema);
