import { Request, Response, NextFunction } from "express";
import Review from "../../model/review";
import Book from "../../model/book";
import { ValidationError } from "../../utils/errorHandler";

// Add review
export const addReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { rating, review } = req.body;
    const { bookId } = req.params;
    const userId = (req as any).user._id;

    const newReview = new Review({
      user: userId,
      book: bookId,
      rating,
      review,
    });
    await newReview.save();

    // Update book's reviews and rating
    await Book.findByIdAndUpdate(bookId, {
      $push: { reviews: newReview._id },
      $inc: { reviewCount: 1 },
      // Optionally recalculate average rating here
    });

    res.status(201).json({ message: "Review added", review: newReview });
  } catch (error) {
    next(error);
  }
};

// Delete review (user can delete own, admin can delete any)
export const deleteReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review) return next(new ValidationError("Review not found"));

    // Only allow owner or admin
    const user = (req as any).user;
    if (
      review.user.toString() !== user._id.toString() &&
      user.role !== "admin"
    ) {
      return next(new ValidationError("Not authorized"));
    }

    await Review.findByIdAndDelete(reviewId);
    await Book.findByIdAndUpdate(review.book, {
      $pull: { reviews: reviewId },
      $inc: { reviewCount: -1 },
    });

    res.json({ message: "Review deleted" });
  } catch (error) {
    next(error);
  }
};
