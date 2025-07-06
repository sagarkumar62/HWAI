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
    caseStudy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CaseStudy",
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


const caseStudySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    summary: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    coverImageUrl: {
      type: String,
    },
    tags: [
      {
        type: String,
      },
    ],
    relatedProject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project", // If you link it to a project
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likesCount: {
      type: Number,
      default: 0,
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
    comments: [commentSchema], // Embedded subdocuments for direct in-document comments
    status: {
      type: String,
      enum: ["published", "draft", "archived"],
      default: "draft",
    },
    publishedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model("CaseStudy", caseStudySchema);
