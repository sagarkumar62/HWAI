import ResearchPaper from "../models/researchPaper.model.js";
import { uploadFile } from "../config/imagekit.js"; // Uncomment and implement if you want file uploads

// Service: upload file/image and create research paper
export async function createResearchPaperService({
  fileBuffer, // for PDF upload
  imageBuffer, // for cover image upload
  url, // PDF URL (if type is URL)
  image, // cover image URL (optional)
  title,
  abstract,
  authors,
  publicationDate,
  journal,
  doi,
  tags,
  category,
  createdBy,
  initiative,
  ...rest
}) {
  if (!title || !abstract || !createdBy) {
    throw new Error("title, abstract, and createdBy are required");
  }

  let finalFileUrl = url;
  let finalImageUrl = image;

  // Use Promise.all to parallelize file and image upload if both are present
  let fileUploadPromise = null;
  let imageUploadPromise = null;


  // Handle file upload (for PDF)
  if (fileBuffer) {
    fileUploadPromise = uploadFile(fileBuffer).then(result => result.url);
  } else if (url) {
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

  const researchPaper = new ResearchPaper({
    title,
    abstract,
    authors,
    publicationDate,
    journal,
    doi,
    url: finalFileUrl,
    file: finalFileUrl,
    image: finalImageUrl,
    tags,
    category,
    createdBy,
    initiative,
    ...rest
  });
  return await researchPaper.save();
}
