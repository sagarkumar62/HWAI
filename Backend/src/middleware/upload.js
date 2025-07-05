import multer from "multer";

// Multer middleware for single image upload (buffer in memory)
const upload = multer({ storage: multer.memoryStorage() });

export default upload;
