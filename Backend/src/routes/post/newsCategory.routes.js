import express from 'express';
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
} from '../../controllers/category.controller.js';
import { protect } from '../../middleware/protect.middleware.js';

const router = express.Router();

// All routes below require admin privileges

router.post('/upload', protect(["admin"]), createCategory);
router.get('/get', getCategories);
router.get('/get/:id', getCategoryById);
router.put('/update/:id', protect(["admin"]), updateCategory);
router.delete('/delete/:id', protect(["admin"]), deleteCategory);

export default router;