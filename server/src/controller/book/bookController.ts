import { Request, Response, NextFunction } from "express";
import Book from "../../model/book";
import { ValidationError } from "../../utils/errorHandler";

// Get all books
export const getAllBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const books = await Book.find().populate("reviews").populate("comments");
    res.json(books);
  } catch (error) {
    next(error);
  }
};

// Get book by ID
export const getBookById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const book = await Book.findById(req.params.id)
      .populate("reviews")
      .populate("comments");
    if (!book) return next(new ValidationError("Book not found"));
    res.json(book);
  } catch (error) {
    next(error);
  }
};

// Search books (by title, author, category, etc.)
export const searchBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { q } = req.query;
    const books = await Book.find({
      $or: [
        { title: { $regex: q, $options: "i" } },
        { author: { $regex: q, $options: "i" } },
        { category: { $regex: q, $options: "i" } },
      ],
    });
    res.json(books);
  } catch (error) {
    next(error);
  }
};

// Update book (admin only)
export const updateBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updateData = { ...req.body };
    if (req.file?.path) updateData.image = req.file.path;
    const book = await Book.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    if (!book) return next(new ValidationError("Book not found"));
    res.json({ message: "Book updated", book });
  } catch (error) {
    next(error);
  }
};

// Delete book (admin only)
export const deleteBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return next(new ValidationError("Book not found"));
    res.json({ message: "Book deleted" });
  } catch (error) {
    next(error);
  }
};
