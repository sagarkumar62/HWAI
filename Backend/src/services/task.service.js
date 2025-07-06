import Task from "../models/task.model.js";

export async function createTaskService({ title, description, initiative, assignedTo, status, dueDate, priority, attachments, createdBy, comments }) {
  if (!title || !createdBy) {
    throw new Error("Title and createdBy are required");
  }
  const task = new Task({ title, description, initiative, assignedTo, status, dueDate, priority, attachments, createdBy, comments });
  return await task.save();
}
