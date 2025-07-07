import Podcast from "../models/podcast.model.js";
import { uploadFile, uploadVideoFile } from "../config/imagekit.js"; 

export async function createPodcastService({
  videoBuffer,
  thumbnailBuffer,
  video, // URL if provided
  thumbnailUrl,
  title,
  description,
  duration,
  tags,
  uploadedBy,
  ...rest
}) {
  if (!title || !uploadedBy || (!videoBuffer && !video)) {
    throw new Error("title, uploadedBy, and video file or URL are required");
  }

  let finalVideoUrl = video;
  let finalThumbnailUrl = thumbnailUrl;

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

  const podcast = new Podcast({
    title,
    description,
    video: finalVideoUrl, // use consistent field
    thumbnailUrl: finalThumbnailUrl,
    duration,
    tags,
    uploadedBy,
    ...rest
  });

  return await podcast.save();
}

