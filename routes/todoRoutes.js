const express = require("express");
const router = express.Router();
const {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  searchTodo
} = require("../controllers/todoController");

router.get("/", getTodos);
router.post("/", createTodo);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);
router.get("/search", searchTodo);

module.exports = router;