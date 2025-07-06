import mongoose from "mongoose";

const updateSchema = new mongoose.Schema({
    content: { type: String, required: true },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    createdAt: { type: Date, default: Date.now },
});

const initiativeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    status: {
        type: String,
        enum: ["planned", "ongoing", "completed", "cancelled"],
        default: "planned"
    },
    tags: [{
        type: String,
        trim: true
    }],
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    },
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task"
    }],
    updates: [updateSchema],
    bannerImage: {
        type: String,
    },
    location: {
        type: String,
    },
}, {
    timestamps: true
});

export default mongoose.model("Initiative", initiativeSchema);
