import multer from "multer";

// Multer storage in memory
const storage = multer.memoryStorage();

// File filter for images, PDFs, and videos
function fileFilter(req, file, cb) {
  if (
    file.mimetype.startsWith("image/") ||
    file.mimetype === "application/pdf" ||
    file.mimetype.startsWith("video/")
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only image, PDF, and video files are allowed!"), false);
  }
}

// Multer middleware for image and PDF upload (buffer in memory)
const upload = multer({ storage, fileFilter });

export default upload;
