import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    category: {
        type: String,
        enum: ["Article", "Video", "Dataset", "Tool", "Paper", "Other"],
        default: "Other",
    },
    resourceCategory: {
        type: String,
        enum: ["Beginner", "Intermediate", "Advanced", "General"],
        default: "General",
    },
    resourceType: {
        type: String,
        enum: ["URL", "File"],
        required: true,
    },
    url: {
        type: String,
        trim: true,
    },
    file: {
        type: String, // File URL or GridFS ObjectId
    },
    image: {
        type: String, // Cover image URL (ImageKit, Cloudinary, S3)
    },
    tags: [{
        type: String,
        trim: true,
    }],
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

export default mongoose.model("Resource", resourceSchema);
