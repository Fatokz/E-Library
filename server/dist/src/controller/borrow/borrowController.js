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
exports.getUserBorrows = exports.returnBook = exports.borrowBook = void 0;
const borrow_1 = __importDefault(require("../../model/borrow"));
const book_1 = __importDefault(require("../../model/book"));
const errorHandler_1 = require("../../utils/errorHandler");
// Borrow a book
const borrowBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const userId = req.user._id;
        const book = yield book_1.default.findById(bookId);
        if (!book)
            return next(new errorHandler_1.ValidationError("Book not found"));
        if (book.availability !== "hardcopy" || book.status !== "borrowable") {
            return next(new errorHandler_1.ValidationError("Book is not borrowable"));
        }
        const borrow = new borrow_1.default({ user: userId, book: bookId });
        yield borrow.save();
        res.status(201).json({ message: "Book borrowed", borrow });
    }
    catch (error) {
        next(error);
    }
});
exports.borrowBook = borrowBook;
// Return a book
const returnBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { borrowId } = req.params;
        const borrow = yield borrow_1.default.findById(borrowId);
        if (!borrow)
            return next(new errorHandler_1.ValidationError("Borrow record not found"));
        borrow.status = "returned";
        borrow.returnDate = new Date();
        yield borrow.save();
        res.json({ message: "Book returned", borrow });
    }
    catch (error) {
        next(error);
    }
});
exports.returnBook = returnBook;
// Get all borrows for a user
const getUserBorrows = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user._id;
        const borrows = yield borrow_1.default.find({ user: userId }).populate("book");
        res.json(borrows);
    }
    catch (error) {
        next(error);
    }
});
exports.getUserBorrows = getUserBorrows;
