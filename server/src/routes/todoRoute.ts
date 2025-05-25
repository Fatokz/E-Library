import express from "express";
import { isAuthenticated } from "../middleware/isAuthenticated";
import {
  addTodo,
  getTodos,
  updateTodo,
  deleteTodo,
} from "../controller/user/todoController";

const router = express.Router();

router.post("/", isAuthenticated, addTodo);
router.get("/", isAuthenticated, getTodos);
router.patch("/:id", isAuthenticated, updateTodo);
router.delete("/:id", isAuthenticated, deleteTodo);

export default router;
