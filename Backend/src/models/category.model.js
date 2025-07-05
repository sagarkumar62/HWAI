import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    description: {
        type: String,
        default: ""
    }
}, { timestamps: true });

categorySchema.virtual("stories", {
    ref: "Story",
    localField: "_id",
    foreignField: "category"
});

categorySchema.set("toObject", { virtuals: true });
categorySchema.set("toJSON", { virtuals: true });


const Category = mongoose.model("Category", categorySchema);
export default Category;
