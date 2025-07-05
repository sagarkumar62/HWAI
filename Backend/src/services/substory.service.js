import SubStory from "../models/substory.model.js";
import { uploadFile } from "../config/imagekit.js";

// Service: upload image and create substory
export async function createSubStoryService({story, fileBuffer, imageUrl, heading, description }) {
  if ((!fileBuffer && !imageUrl) || !story  || !heading || !description) {
    throw new Error("Image (file or URL), story, heading, and description are required.");
  }
  let finalImageUrl = imageUrl;
  if (fileBuffer) {
    // Upload image to ImageKit
    const result = await uploadFile(fileBuffer);
    finalImageUrl = result.url;
  }
  // Create substory with image URL
  const substory = new SubStory({ story, heading, description, image: finalImageUrl });
  return await substory.save();
}
