import mongoose from "mongoose";

// Inline Comment Schema for VideoTutorial (like Podcast)
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
    videoTutorial: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "VideoTutorial",
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

// VideoTutorial Schema (like Podcast)
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
    video: {
      type: String,
      required: true,
    },
    thumbnailUrl: {
      type: String,
    },
    duration: {
      type: Number,
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
    likesCount: {
      type: Number,
      default: 0,
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
    comments: [commentSchema],
    isPublished: {
      type: Boolean,
      default: false,
    },
    publishedAt: {
      type: Date,
    },
    category: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("VideoTutorial", videoTutorialSchema);
