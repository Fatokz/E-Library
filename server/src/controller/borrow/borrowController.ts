import { Request, Response, NextFunction } from "express";
import Borrow from "../../model/borrow";
import Book from "../../model/book";
import { ValidationError } from "../../utils/errorHandler";

// Borrow a book
export const borrowBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { bookId } = req.params;
    const userId = (req as any).user._id;
    const book = await Book.findById(bookId);

    if (!book) return next(new ValidationError("Book not found"));
    if (book.availability !== "hardcopy" || book.status !== "borrowable") {
      return next(new ValidationError("Book is not borrowable"));
    }

    const borrow = new Borrow({ user: userId, book: bookId });
    await borrow.save();

    res.status(201).json({ message: "Book borrowed", borrow });
  } catch (error) {
    next(error);
  }
};

// Return a book
export const returnBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { borrowId } = req.params;
    const borrow = await Borrow.findById(borrowId);
    if (!borrow) return next(new ValidationError("Borrow record not found"));

    borrow.status = "returned";
    borrow.returnDate = new Date();
    await borrow.save();

    res.json({ message: "Book returned", borrow });
  } catch (error) {
    next(error);
  }
};

// Get all borrows for a user
export const getUserBorrows = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user._id;
    const borrows = await Borrow.find({ user: userId }).populate("book");
    res.json(borrows);
  } catch (error) {
    next(error);
  }
};