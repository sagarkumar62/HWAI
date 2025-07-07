import express from "express";
import {
  createResearchPaper,
  getResearchPapers,
  getResearchPaperById,
  getResearchPaperByIdWithViews,
  updateResearchPaper,
  deleteResearchPaper,
  downloadResearchPaper,
  likeResearchPaper,
  unlikeResearchPaper
} from "../../controllers/researchPaper.controller.js";
import { protect } from "../../middleware/protect.middleware.js";
import upload from "../../middleware/upload.js";

const router = express.Router();

// CREATE a new research paper
router.post("/upload", protect(["admin", "user"]),upload.fields([
        { name: "image", maxCount: 1 },
        { name: "file", maxCount: 1 },
    ]), createResearchPaper);

// GET all research papers
router.get("/get", getResearchPapers);

// GET a single research paper by ID and increment view count
router.get("/get/:id", getResearchPaperByIdWithViews);

// UPDATE a research paper
router.put("/update/:id", protect(["admin", "user"]),upload.fields([
        { name: "image", maxCount: 1 },
        { name: "file", maxCount: 1 },
    ]), updateResearchPaper);

// DELETE a research paper
router.delete("/delete/:id", protect(["admin", "user"]), deleteResearchPaper);

// DOWNLOAD a research paper file
router.get("/download/:id", downloadResearchPaper);

// LIKE a research paper
router.post("/:id/like", protect(["admin", "user"]), likeResearchPaper);

// UNLIKE a research paper
router.post("/:id/unlike", protect(["admin", "user"]), unlikeResearchPaper);

export default router;
