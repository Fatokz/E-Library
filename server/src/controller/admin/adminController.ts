import { Request, Response, NextFunction } from "express";
import { ValidationError } from "../../utils/errorHandler";
import Book from "../../model/book";

// Add a book (admin only)
export const addBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      title,
      description,
      author,
      category,
      pages,
      publishedDate,
      availability,
      isPaid,
      price,
      status,
      isInShelf,
    } = req.body;

    const image = req.file?.path;

    // Business rules
    if (availability === "ebook" && status === "borrowable") {
      return next(new ValidationError("Ebooks cannot be borrowable"));
    }
    // if (availability === "hardcopy" && !isPaid) {
    //   return next(new ValidationError("Hardcopy books must be paid"));
    // }

    const book = new Book({
      title,
      description,
      author,
      category,
      pages,
      publishedDate,
      availability,
      isPaid,
      price,
      status,
      isInShelf,
      image,
      createdBy: (req as any).admin._id,
    });

    await book.save();
    res.status(201).json({ message: "Book added", book });
  } catch (error) {
    next(error);
  }
};
