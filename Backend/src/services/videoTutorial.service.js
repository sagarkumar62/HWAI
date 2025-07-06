
import VideoTutorial from "../models/videoTutorials.model.js";
import { uploadFile } from "../config/imagekit.js"; // Uncomment and implement if you want file uploads

// Service: upload video file/thumbnail and create video tutorial
export async function createVideoTutorialService({
  videoBuffer, // for video upload
  thumbnailBuffer, // for thumbnail image upload
  videoUrl, // video URL (if type is URL)
  thumbnailUrl, // thumbnail image URL (optional)
  title,
  description,
  duration,
  tags,
  uploadedBy,
  isPublished,
  category,
  ...rest
}) {
  if (!title || !videoUrl || !uploadedBy) {
    throw new Error("title, videoUrl, and uploadedBy are required");
  }

  let finalVideoUrl = videoUrl;
  let finalThumbnailUrl = thumbnailUrl;

  let videoUploadPromise = null;
  let thumbnailUploadPromise = null;

  // Handle video upload
  if (videoBuffer) {
    videoUploadPromise = uploadFile(videoBuffer).then(result => result.url);
  } else if (videoUrl) {
    videoUploadPromise = (async () => {
      const response = await fetch(videoUrl);
      if (!response.ok) throw new Error('Failed to fetch video from URL');
      const urlBuffer = Buffer.from(await response.arrayBuffer());
      const result = await uploadFile(urlBuffer);
      return result.url;
    })();
  }

  // Handle thumbnail upload (optional)
  if (thumbnailBuffer) {
    thumbnailUploadPromise = uploadFile(thumbnailBuffer).then(result => result.url);
  } else if (thumbnailUrl) {
    thumbnailUploadPromise = (async () => {
      const response = await fetch(thumbnailUrl);
      if (!response.ok) throw new Error('Failed to fetch thumbnail from URL');
      const urlBuffer = Buffer.from(await response.arrayBuffer());
      const result = await uploadFile(urlBuffer);
      return result.url;
    })();
  }

  // Await uploads in parallel if needed
  if (videoUploadPromise || thumbnailUploadPromise) {
    const [videoUploadedUrl, thumbnailUploadedUrl] = await Promise.all([
      videoUploadPromise,
      thumbnailUploadPromise
    ]);
    if (videoUploadedUrl) finalVideoUrl = videoUploadedUrl;
    if (thumbnailUploadedUrl) finalThumbnailUrl = thumbnailUploadedUrl;
  }

  const videoTutorial = new VideoTutorial({
    title,
    description,
    videoUrl: finalVideoUrl,
    thumbnailUrl: finalThumbnailUrl,
    duration,
    tags,
    uploadedBy,
    isPublished,
    category,
    ...rest
  });
  return await videoTutorial.save();
}
