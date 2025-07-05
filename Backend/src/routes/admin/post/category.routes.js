import express from 'express';
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
} from '../../../controllers/category.controller.js';
import { isAdmin } from '../../../middleware/adminAuth.middleware.js';

const router = express.Router();

// All routes below require admin privileges
router.post('/upload', isAdmin, createCategory);
router.get('/get', isAdmin, getCategories);
router.get('/get/:id', isAdmin, getCategoryById);
router.put('/update/:id', isAdmin, updateCategory);
router.delete('/delete/:id', isAdmin, deleteCategory);

export default router;