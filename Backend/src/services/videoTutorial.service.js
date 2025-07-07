
import VideoTutorial from "../models/videoTutorials.model.js";
import { uploadFile, uploadVideoFile } from "../config/imagekit.js";

// Service: upload video file/thumbnail and create video tutorial
export async function createVideoTutorialService({
  videoBuffer,
  thumbnailBuffer,
  video, // URL if provided
  thumbnailUrl,
  title,
  description,
  duration,
  tags,
  uploadedBy,
  isPublished,
  category,
  ...rest
}) {
  if (!title || !uploadedBy || (!videoBuffer && !video)) {
    throw new Error("title, uploadedBy, and video file or URL are required");
  }

  let finalVideoUrl = video;
  console.log("video", video);
  console.log("videoBuffer", videoBuffer);
  let finalThumbnailUrl = thumbnailUrl;
  console.log("thumbnailUrl", thumbnailUrl);

  const uploadPromises = [];

  if (videoBuffer) {
    uploadPromises.push(
      uploadVideoFile(videoBuffer).then(res => { finalVideoUrl = res.url; })
    );
  }

  if (thumbnailBuffer) {
    uploadPromises.push(
      uploadFile(thumbnailBuffer).then(res => { finalThumbnailUrl = res.url; })
    );
  }

  await Promise.all(uploadPromises);

  const videoTutorial = new VideoTutorial({
    title,
    description,
    video: finalVideoUrl,
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
