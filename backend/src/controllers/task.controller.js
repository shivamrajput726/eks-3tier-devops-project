const Task = require("../models/task.model");

async function listTasks(_req, res) {
  const tasks = await Task.find().sort({ createdAt: -1 }).lean();
  res.status(200).json(tasks);
}

async function createTask(req, res) {
  const { title, description = "", completed = false } = req.body;

  if (!title || typeof title !== "string") {
    res.status(400).json({ message: "title is required" });
    return;
  }

  const task = await Task.create({
    title: title.trim(),
    description: String(description).trim(),
    completed: Boolean(completed),
  });

  res.status(201).json(task);
}

async function updateTask(req, res) {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  const task = await Task.findByIdAndUpdate(
    id,
    {
      ...(title !== undefined ? { title: String(title).trim() } : {}),
      ...(description !== undefined
        ? { description: String(description).trim() }
        : {}),
      ...(completed !== undefined ? { completed: Boolean(completed) } : {}),
    },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!task) {
    res.status(404).json({ message: "task not found" });
    return;
  }

  res.status(200).json(task);
}

async function deleteTask(req, res) {
  const { id } = req.params;
  const task = await Task.findByIdAndDelete(id);

  if (!task) {
    res.status(404).json({ message: "task not found" });
    return;
  }

  res.status(200).json({ message: "task deleted" });
}

module.exports = {
  listTasks,
  createTask,
  updateTask,
  deleteTask,
};
