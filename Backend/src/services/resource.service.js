import Resource from "../models/resource.model.js";
import { uploadFile } from "../config/imagekit.js";

// Service: upload file/image and create resource
export async function createResourceService({
  fileBuffer, // for file upload
  imageBuffer, // for cover image upload
  url, // resource URL (if type is URL)
  image, // cover image URL (optional)
  resourceType,
  title,
  description,
  category,
  resourceCategory,
  tags,
  createdBy,
  initiative,
  ...rest
}) {
  if (!resourceType || !title || !createdBy) {
    throw new Error("resourceType, title, and createdBy are required");
  }

  let finalFileUrl = url;
  let finalImageUrl = image;

  // Use Promise.all to parallelize file and image upload if both are present
  let fileUploadPromise = null;
  let imageUploadPromise = null;

  // Handle file upload (for resourceType === 'File')
  if (fileBuffer && resourceType === 'File') {
    fileUploadPromise = uploadFile(fileBuffer).then(result => result.url);
  } else if (url && resourceType === 'File') {
    // If url is provided and resourceType is File, fetch and upload to ImageKit
    fileUploadPromise = (async () => {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch file from URL');
      const urlBuffer = Buffer.from(await response.arrayBuffer());
      const result = await uploadFile(urlBuffer);
      return result.url;
    })();
  }

  // Handle cover image upload (optional)
  if (imageBuffer) {
    imageUploadPromise = uploadFile(imageBuffer).then(result => result.url);
  } else if (image) {
    imageUploadPromise = (async () => {
      const response = await fetch(image);
      if (!response.ok) throw new Error('Failed to fetch image from URL');
      const urlBuffer = Buffer.from(await response.arrayBuffer());
      const result = await uploadFile(urlBuffer);
      return result.url;
    })();
  }

  // Await uploads in parallel if needed
  if (fileUploadPromise || imageUploadPromise) {
    const [fileUrl, imageUrl] = await Promise.all([
      fileUploadPromise,
      imageUploadPromise
    ]);
    if (fileUrl) finalFileUrl = fileUrl;
    if (imageUrl) finalImageUrl = imageUrl;
  }

  const resource = new Resource({
    title,
    description,
    category,
    resourceCategory,
    resourceType,
    url: finalFileUrl,
    file: resourceType === 'File' ? finalFileUrl : undefined,
    image: finalImageUrl,
    tags,
    createdBy,
    initiative,
    ...rest
  });
  return await resource.save();
}
