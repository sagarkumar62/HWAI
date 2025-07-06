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
import {verifyToken} from "../../middleware/verifyToken.middleware.js";
import {isAdminOrUser} from "../../middleware/isAdminOrUser.middleware.js";

const router = express.Router();

// CREATE a new research paper
router.post("/upload", verifyToken, isAdminOrUser, createResearchPaper);

// GET all research papers
router.get("/get", getResearchPapers);

// GET a single research paper by ID and increment view count
router.get("/get/:id", getResearchPaperByIdWithViews);

// UPDATE a research paper
router.put("/update/:id", verifyToken, isAdminOrUser, updateResearchPaper);

// DELETE a research paper
router.delete("/delete/:id", verifyToken, isAdminOrUser, deleteResearchPaper);

// DOWNLOAD a research paper file
router.get("/download/:id", downloadResearchPaper);

// LIKE a research paper
router.post("/:id/like", verifyToken, likeResearchPaper);

// UNLIKE a research paper
router.post("/:id/unlike", verifyToken, unlikeResearchPaper);

export default router;
