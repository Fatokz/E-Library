"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReview = exports.addReview = void 0;
const review_1 = __importDefault(require("../../model/review"));
const book_1 = __importDefault(require("../../model/book"));
const errorHandler_1 = require("../../utils/errorHandler");
// Add review
const addReview = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { rating, review } = req.body;
        const { bookId } = req.params;
        const userId = req.user._id;
        const newReview = new review_1.default({
            user: userId,
            book: bookId,
            rating,
            review,
        });
        yield newReview.save();
        // Update book's reviews and rating
        yield book_1.default.findByIdAndUpdate(bookId, {
            $push: { reviews: newReview._id },
            $inc: { reviewCount: 1 },
            // Optionally recalculate average rating here
        });
        res.status(201).json({ message: "Review added", review: newReview });
    }
    catch (error) {
        next(error);
    }
});
exports.addReview = addReview;
// Delete review (user can delete own, admin can delete any)
const deleteReview = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { reviewId } = req.params;
        const review = yield review_1.default.findById(reviewId);
        if (!review)
            return next(new errorHandler_1.ValidationError("Review not found"));
        // Only allow owner or admin
        const user = req.user;
        if (review.user.toString() !== user._id.toString() &&
            user.role !== "admin") {
            return next(new errorHandler_1.ValidationError("Not authorized"));
        }
        yield review_1.default.findByIdAndDelete(reviewId);
        yield book_1.default.findByIdAndUpdate(review.book, {
            $pull: { reviews: reviewId },
            $inc: { reviewCount: -1 },
        });
        res.json({ message: "Review deleted" });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteReview = deleteReview;
