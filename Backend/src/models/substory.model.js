import mongoose from "mongoose";

const subStorySchema = new mongoose.Schema({
    story: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Story",
        required: true
    },
    heading: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true });

const SubStory = mongoose.model("SubStory", subStorySchema);
export default SubStory;
