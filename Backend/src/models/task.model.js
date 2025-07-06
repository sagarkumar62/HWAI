import mongoose from "mongoose";
import commentSchema from "./comment.model.js";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
    },
    initiative: {
        // type: mongoose.Schema.Types.ObjectId,
        // ref: "Initiative",
        type: String, // Assuming this is a placeholder for initiative IDs or names
        required: true,
    },
    assignedTo: [{
    type: String,
    required: true,
}],

    status: {
        type: String,
        enum: ["pending", "in-progress", "completed", "blocked"],
        default: "pending",
    },
    dueDate: {
        type: Date,
    },
    priority: {
        type: String,
        enum: ["low", "medium", "high"],
        default: "medium",
    },
    attachments: [{
        type: String,
    }],
    createdBy: {
        // type: mongoose.Schema.Types.ObjectId,
        // ref: "User",
        type: String, // Assuming this is a placeholder for user IDs or usernames
        required: true,
    },
    comments: [commentSchema],
}, {
    timestamps: true
});
taskSchema.virtual("subTasks", {
    ref: "SubTask",
    localField: "_id",
    foreignField: "task"
});

export default mongoose.model("Task", taskSchema);
