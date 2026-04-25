const Todo = require("../models/todoModel");

// GET
exports.getTodos = async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
};

// CREATE
exports.createTodo = async (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ message: "Title required" });

  const todo = await Todo.create({ title });
  res.status(201).json(todo);
};

// UPDATE
exports.updateTodo = async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) return res.status(404).json({ message: "Not found" });

  todo.title = req.body.title || todo.title;
  todo.completed = req.body.completed ?? todo.completed;

  const updated = await todo.save();
  res.json(updated);
};

// DELETE
exports.deleteTodo = async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) return res.status(404).json({ message: "Not found" });

  await todo.deleteOne();
  res.json({ message: "Deleted" });
};

// SEARCH
exports.searchTodo = async (req, res) => {
  const keyword = req.query.q || "";
  const todos = await Todo.find({
    title: { $regex: keyword, $options: "i" },
  });
  res.json(todos);
};