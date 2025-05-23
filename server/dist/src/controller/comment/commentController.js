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
exports.deleteComment = exports.addComment = void 0;
const comment_1 = __importDefault(require("../../model/comment"));
const book_1 = __importDefault(require("../../model/book"));
const errorHandler_1 = require("../../utils/errorHandler");
// Add comment
const addComment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { comment } = req.body;
        const { bookId } = req.params;
        const userId = req.user._id;
        const newComment = new comment_1.default({ user: userId, book: bookId, comment });
        yield newComment.save();
        yield book_1.default.findByIdAndUpdate(bookId, {
            $push: { comments: newComment._id },
        });
        res.status(201).json({ message: "Comment added", comment: newComment });
    }
    catch (error) {
        next(error);
    }
});
exports.addComment = addComment;
// Delete comment (user can delete own, admin can delete any)
const deleteComment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { commentId } = req.params;
        const comment = yield comment_1.default.findById(commentId);
        if (!comment)
            return next(new errorHandler_1.ValidationError("Comment not found"));
        const user = req.user;
        if (comment.user.toString() !== user._id.toString() &&
            user.role !== "admin") {
            return next(new errorHandler_1.ValidationError("Not authorized"));
        }
        yield comment_1.default.findByIdAndDelete(commentId);
        yield book_1.default.findByIdAndUpdate(comment.book, {
            $pull: { comments: commentId },
        });
        res.json({ message: "Comment deleted" });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteComment = deleteComment;
