import Category from "../models/category.model.js";

// Service: create a new category
export async function createCategoryService({ name, slug, description }) {
  if (!name || !slug) {
    throw new Error("Name and slug are required.");
  }
  const category = new Category({ name, slug, description });
  return await category.save();
}
