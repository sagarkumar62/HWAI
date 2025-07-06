import Initiative from "../models/initiative.model.js";

// Service: create a new initiative with image upload logic (file or URL)
export async function createInitiativeService({
  fileBuffer, // Buffer if file uploaded
  bannerImage, // URL if provided
  title,
  description,
  createdBy,
  status,
  tags,
  startDate,
  endDate,
  participants,
  tasks,
  updates,
  location
}) {
  if (!title || !description || !createdBy) {
    throw new Error("Title, description, and createdBy are required");
  }

  let finalBannerImageUrl = bannerImage;

  // If fileBuffer is provided, upload to ImageKit
  if (fileBuffer) {
    const { uploadFile } = await import("../config/imagekit.js");
    const result = await uploadFile(fileBuffer);
    finalBannerImageUrl = result.url;
  } else if (bannerImage) {
    // If bannerImage is a URL, fetch and upload to ImageKit
    try {
      const response = await fetch(bannerImage);
      if (!response.ok) throw new Error('Failed to fetch banner image from URL');
      const urlBuffer = Buffer.from(await response.arrayBuffer());
      const { uploadFile } = await import("../config/imagekit.js");
      const result = await uploadFile(urlBuffer);
      finalBannerImageUrl = result.url;
    } catch (err) {
      throw new Error("Failed to fetch or upload banner image from URL: " + err.message);
    }
  }

  const initiative = new Initiative({
    title,
    description,
    createdBy,
    status,
    tags,
    startDate,
    endDate,
    participants,
    tasks,
    updates,
    bannerImage: finalBannerImageUrl,
    location
  });
  return await initiative.save();
}
