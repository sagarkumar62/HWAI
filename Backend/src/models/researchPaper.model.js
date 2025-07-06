import mongoose from "mongoose";

const researchPaperSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    abstract: {
        type: String,
        required: true,
        trim: true,
    },
    authors: [{
        type: String,
        trim: true,
    }],
    publicationDate: {
        type: Date,
    },
    journal: {
        type: String,
        trim: true,
    },
    doi: {
        type: String,
        trim: true,
    },
    url: {
        type: String,
        trim: true,
    },
    file: {
        type: String, // URL of uploaded PDF (S3, ImageKit, etc.)
    },
    image: {
        type: String, // Cover image or figure from the paper
    },
    tags: [{
        type: String,
        trim: true,
    }],
    category: {
        type: String,
        enum: ["AI", "ML", "NLP", "CV", "Robotics", "Other"],
        default: "Other",
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    initiative: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Initiative",
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
    downloadsCount: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});

export default mongoose.model("ResearchPaper", researchPaperSchema);
