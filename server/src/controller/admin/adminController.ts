import { Request, Response, NextFunction } from "express";
import { ValidationError } from "../../utils/errorHandler";
import Book from "../../model/book";
import User from "../../model/user";

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

// Get all users (admin only)
export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
};

// Delete a user (admin only)
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return next(new ValidationError("User not found"));
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// Update a user (admin only)
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const update = req.body;
    const user = await User.findByIdAndUpdate(id, update, { new: true }).select(
      "-password"
    );
    if (!user) {
      return next(new ValidationError("User not found"));
    }
    res.status(200).json({ message: "User updated", user });
  } catch (error) {
    next(error);
  }
};
