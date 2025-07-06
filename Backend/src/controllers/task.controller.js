
import { createTaskService } from "../services/task.service.js";
import Task from "../models/task.model.js";

// Create a new task
export async function createTask(req, res) {
  try {
    const { title, description, initiative, assignedTo, status, dueDate, priority, attachments, comments } = req.body;
    const createdBy = req.user && req.user.id;
    const task = await createTaskService({ title, description, initiative, assignedTo, status, dueDate, priority, attachments, createdBy, comments });
    res.status(201).json({ message: "Task created successfully.", task });
  } catch (error) {
    res.status(500).json({ message: "Task creation failed.", error: error.message });
  }
}

// Get all tasks
export async function getTasks(req, res) {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tasks.", error: error.message });
  }
}

// Get a single task by ID
export async function getTaskById(req, res) {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch task.", error: error.message });
  }
}

// Update a task
export async function updateTask(req, res) {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const task = await Task.findByIdAndUpdate(id, updateData, { new: true });
    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }
    res.status(200).json({ message: "Task updated successfully.", task });
  } catch (error) {
    res.status(500).json({ message: "Task update failed.", error: error.message });
  }
}

// Delete a task
export async function deleteTask(req, res) {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }
    res.status(200).json({ message: "Task deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Task deletion failed.", error: error.message });
  }
}
