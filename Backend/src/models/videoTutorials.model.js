import mongoose from "mongoose";

// Embedded Comment Schema
const commentSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

// Main Video Tutorial Schema
const videoTutorialSchema = new mongoose.Schema(
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
    videoUrl: {
      type: String,
      required: true,
    },
    thumbnailUrl: {
      type: String,
    },
    duration: {
      type: Number, // store in seconds
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
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    likeCount: {
      type: Number,
      default: 0,
    },
    comments: [commentSchema], // embedded comments
    isPublished: {
      type: Boolean,
      default: true,
    },
    category: {
      type: String,
      enum: ["Web Development", "AI", "Data Science", "DSA", "Career", "Other"],
      default: "Other",
    },
  },
  { timestamps: true }
);

const VideoTutorial = mongoose.model("VideoTutorial", videoTutorialSchema);

export default VideoTutorial;
