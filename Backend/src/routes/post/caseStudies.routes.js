import express from "express";
import {
  createCaseStudy,
  getCaseStudies,
  getCaseStudyById,
  updateCaseStudy,
  deleteCaseStudy,
  incrementCaseStudyViews,
  likeCaseStudy,
  unlikeCaseStudy
} from "../../controllers/caseStudies.controller.js";
import {protect} from "../../middleware/protect.middleware.js";
import upload from "../../middleware/upload.js";

const router = express.Router();

// Create a new case study
router.post("/upload", protect(["admin"]),upload.fields([
        { name: "image", maxCount: 1 },
         { name: "file", maxCount: 1 }
    ]), createCaseStudy);

// Get all case studies
router.get("/get", getCaseStudies);

// Get a single case study by ID
router.get("/get/:id", getCaseStudyById);

// Update a case study
router.put("/update/:id", protect(["admin"]), updateCaseStudy);

// Delete a case study
router.delete("/delete/:id", protect(["admin","user"]), deleteCaseStudy);

// Increment case study views
router.post("/:id/views", incrementCaseStudyViews);

// Like a case study
router.post("/:id/like", protect(["admin","user"]), likeCaseStudy);

// Unlike a case study
router.post("/:id/unlike", protect(["admin","user"]), unlikeCaseStudy);

export default router;
