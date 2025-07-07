import Mission from "../models/mission.model.js";

// Service: create a new mission with image upload logic (file or URL)
export async function createMissionService({
  imageBuffer, // Buffer if file uploaded
  image, // URL if provided
  title,
  description,
  createdBy,
  isActive,
  tags
}) {
  if (!title || !description || !createdBy) {
    throw new Error("Title, description, and createdBy are required");
  }

  let finalImageUrl = image;

  // If imageBuffer is provided, upload to ImageKit
  if (image) {
    const { uploadFile } = await import("../config/imagekit.js");
    const result = await uploadFile(image);
    finalImageUrl = result.url;
  }
  // If image is a URL, just use it as is (no remote fetch)

  const mission = new Mission({
    title,
    description,
    createdBy,
    isActive,
    tags,
    image: finalImageUrl
  });
  return await mission.save();
}

// Service: update an existing mission with image upload logic (file or URL)
export async function updateMissionService({
  id,
  imageBuffer, // Buffer if file uploaded
  image, // URL if provided
  title,
  description,
  isActive,
  tags,
  updatedBy
}) {
  const mission = await Mission.findById(id);
  if (!mission) return null;

  let finalImageUrl = mission.image;

  // If imageBuffer is provided, upload to ImageKit
  if (imageBuffer) {
    const { uploadFile } = await import("../config/imagekit.js");
    const result = await uploadFile(imageBuffer);
    finalImageUrl = result.url;
  } else if (image && image !== mission.image) {
    // If image is a new URL, just use it as is (no remote fetch)
    finalImageUrl = image;
  }

  // Update fields
  if (title !== undefined) mission.title = title;
  if (description !== undefined) mission.description = description;
  if (isActive !== undefined) mission.isActive = isActive;
  if (tags !== undefined) mission.tags = tags;
  mission.image = finalImageUrl;
  if (updatedBy !== undefined) mission.updatedBy = updatedBy;

  return await mission.save();
}
