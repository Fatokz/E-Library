import { Request, Response, NextFunction } from "express";
import Comment from "../../model/comment";
import Book from "../../model/book";
import { ValidationError } from "../../utils/errorHandler";

// Add comment
export const addComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { comment } = req.body;
    const { bookId } = req.params;
    const userId = (req as any).user._id;

    const newComment = new Comment({ user: userId, book: bookId, comment });
    await newComment.save();

    await Book.findByIdAndUpdate(bookId, {
      $push: { comments: newComment._id },
    });

    res.status(201).json({ message: "Comment added", comment: newComment });
  } catch (error) {
    next(error);
  }
};

// Delete comment (user can delete own, admin can delete any)
export const deleteComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { commentId } = req.params;
    const comment = await Comment.findById(commentId);
    if (!comment) return next(new ValidationError("Comment not found"));

    const user = (req as any).user;
    if (
      comment.user.toString() !== user._id.toString() &&
      user.role !== "admin"
    ) {
      return next(new ValidationError("Not authorized"));
    }

    await Comment.findByIdAndDelete(commentId);
    await Book.findByIdAndUpdate(comment.book, {
      $pull: { comments: commentId },
    });

    res.json({ message: "Comment deleted" });
  } catch (error) {
    next(error);
  }
};
