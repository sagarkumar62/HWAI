import storyModel from "../models/story.model.js";
import { uploadFile } from "../config/imagekit.js";

// Service: upload image and create story
export async function createStoryService({ fileBuffer, imageUrl, category, title, description }) {
  if ((!fileBuffer && !imageUrl) || !category || !title || !description) {
    throw new Error("Image (file or URL), category, title, and description are required.");
  }
  let finalImageUrl = imageUrl;
  if (fileBuffer) {
    // Upload image to ImageKit
    const result = await uploadFile(fileBuffer);
    finalImageUrl = result.url;
  }
  // Create story with image URL
  const story = new storyModel({ image: finalImageUrl, category, title, description });
  return await story.save();
}
