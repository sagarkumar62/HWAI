import { createStoryService } from "../services/story.service.js";
import storyModel from "../models/story.model.js";
// Controller: handle upload and story creation
import Category from "../models/category.model.js";

export async function createStory(req, res) {
    try {
        const { category: categoryInput, title, description, image } = req.body;
        let fileBuffer = req.file && req.file.buffer;
        let imageUrl = image; // If image is a URL in body

        // 🔸 Resolve category slug to _id
        const categoryDoc = await Category.findOne({ slug: categoryInput });
        if (!categoryDoc) {
            return res.status(404).json({ message: "Category not found." });
        }
        const category = categoryDoc._id;

        if (fileBuffer) {
            const story = await createStoryService({ fileBuffer, category, title, description });
            return res.status(201).json({
                message: "Story with image uploaded successfully",
                story: {
                    id: story._id,
                    title: story.title,
                    category: story.category,
                    description: story.description,
                    image: story.image,
                },
            });
        } else if (imageUrl) {
            try {
                const response = await fetch(imageUrl);
                if (!response.ok) throw new Error('Failed to fetch image from URL');
                const urlBuffer = Buffer.from(await response.arrayBuffer());
                const story = await createStoryService({ fileBuffer: urlBuffer, category, title, description });
                return res.status(201).json({
                    message: "Story with image URL uploaded to ImageKit successfully",
                    story: {
                        id: story._id,
                        title: story.title,
                        category: story.category,
                        description: story.description,
                        image: story.image,
                    },
                });
            } catch (err) {
                return res.status(400).json({ message: "Failed to fetch or upload image from URL.", error: err.message });
            }
        } else {
            return res.status(400).json({ message: "No image file or URL provided." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Image upload failed", error: error.message });
    }
}






// // Create a new story
// export async function createStory(req, res) {
//   try {
//     const { image, category, title, description } = req.body;
//     const story = await createStoryService({ image, category, title, description });
//     res.status(201).json({ message: "Story created successfully.", story });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// }

// Get all stories
export async function getStory(req, res) {
  try {
    const stories = await storyModel.find();
    res.status(200).json(stories);
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
}

// Get a single story by ID
export async function getStoryById(req, res) {
  try {
    const { id } = req.params;
    const story = await storyModel.findById(id);
    if (!story) {
      return res.status(404).json({ message: "Story not found." });
    }
    res.status(200).json(story);
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
}

// Update a story
export async function updateStory(req, res) {
  try {
    const { id } = req.params;
    const { image, category, title, description } = req.body;
    const story = await storyModel.findByIdAndUpdate(
      id,
      { image, category, title, description },
      { new: true }
    );
    if (!story) {
      return res.status(404).json({ message: "Story not found." });
    }
    res.status(200).json({ message: "Story updated successfully.", story });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
}

// Delete a story
export async function deleteStory(req, res) {
  try {
    const { id } = req.params;
    const story = await storyModel.findByIdAndDelete(id);
    if (!story) {
      return res.status(404).json({ message: "Story not found." });
    }
    res.status(200).json({ message: "Story deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
}
