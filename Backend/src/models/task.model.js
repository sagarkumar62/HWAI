
// Inline comment schema for task comments
const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
}, { _id: false });
import mongoose from "mongoose";


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
        type: mongoose.Schema.Types.ObjectId,
        ref: "Initiative",
        // type: String, // Assuming this is a placeholder for initiative IDs or names
        // required: true,
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
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        // type: String, // Assuming this is a placeholder for user IDs or usernames
        // required: true,
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

taskSchema.index({ initiative: 1 });
// taskSchema.index({ assignedTo: 1 });
// taskSchema.index({ createdBy: 1 });
taskSchema.index({ status: 1 });

export default mongoose.model("Task", taskSchema);
