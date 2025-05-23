import { Request, Response, NextFunction } from "express";
import Todo from "../../model/todo";
import { ValidationError } from "../../utils/errorHandler";

// Add a todo
export const addTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, targetCompletedDate } = req.body;
    if (!title || !targetCompletedDate) {
      return next(new ValidationError("Title and target date required"));
    }
    const todo = new Todo({
      user: (req as any).user._id,
      title,
      targetCompletedDate,
    });
    await todo.save();
    res.status(201).json({ message: "Todo created", todo });
  } catch (error) {
    next(error);
  }
};

// Get all todos for user
export const getTodos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).user._id;
    const todos = await Todo.find({ user: userId });
    res.json(todos);
  } catch (error) {
    next(error);
  }
};

// Update a todo
export const updateTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const todo = await Todo.findOneAndUpdate(
      { _id: id, user: (req as any).user._id },
      updateData,
      { new: true }
    );
    if (!todo) return next(new ValidationError("Todo not found"));
    res.json({ message: "Todo updated", todo });
  } catch (error) {
    next(error);
  }
};

// Delete a todo
export const deleteTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findOneAndDelete({
      _id: id,
      user: (req as any).user._id,
    });
    if (!todo) return next(new ValidationError("Todo not found"));
    res.json({ message: "Todo deleted" });
  } catch (error) {
    next(error);
  }
};
