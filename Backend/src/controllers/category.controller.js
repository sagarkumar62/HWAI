import Category from "../models/category.model.js";
import { createCategoryService } from "../services/category.service.js";

// Create a new category
export async function createCategory(req, res) {
  try {
    const { name, slug, description } = req.body;
    const category = await createCategoryService({ name, slug, description });
    res.status(201).json({ message: "Category created successfully.", category });
  } catch (error) {
    res.status(500).json({ message: "Category creation failed.", error: error.message });
  }
}

// Get all categories
export async function getCategories(req, res) {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
}

// Get a single category by ID
export async function getCategoryById(req, res) {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found." });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
}

// Update a category
export async function updateCategory(req, res) {
  try {
    const { id } = req.params;
    const { name, slug, description } = req.body;
    const category = await Category.findByIdAndUpdate(
      id,
      { name, slug, description },
      { new: true }
    );
    if (!category) {
      return res.status(404).json({ message: "Category not found." });
    }
    res.status(200).json({ message: "Category updated successfully.", category });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
}

// Delete a category
export async function deleteCategory(req, res) {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found." });
    }
    res.status(200).json({ message: "Category deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
}
