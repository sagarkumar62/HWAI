import mongoose from "mongoose";

const storySchema = new mongoose.Schema({
    image: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
    }
}, { timestamps: true });

storySchema.virtual("subStories", {
    ref: "SubStory",
    localField: "_id",
    foreignField: "story"
});

storySchema.set("toObject", { virtuals: true });
storySchema.set("toJSON", { virtuals: true });

const Story = mongoose.model("Story", storySchema);
export default Story;
