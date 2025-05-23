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
exports.deleteBook = exports.updateBook = exports.searchBooks = exports.getBookById = exports.getAllBooks = void 0;
const book_1 = __importDefault(require("../../model/book"));
const errorHandler_1 = require("../../utils/errorHandler");
// Get all books
const getAllBooks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield book_1.default.find().populate("reviews").populate("comments");
        res.json(books);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllBooks = getAllBooks;
// Get book by ID
const getBookById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield book_1.default.findById(req.params.id)
            .populate("reviews")
            .populate("comments");
        if (!book)
            return next(new errorHandler_1.ValidationError("Book not found"));
        res.json(book);
    }
    catch (error) {
        next(error);
    }
});
exports.getBookById = getBookById;
// Search books (by title, author, category, etc.)
const searchBooks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { q } = req.query;
        const books = yield book_1.default.find({
            $or: [
                { title: { $regex: q, $options: "i" } },
                { author: { $regex: q, $options: "i" } },
                { category: { $regex: q, $options: "i" } },
            ],
        });
        res.json(books);
    }
    catch (error) {
        next(error);
    }
});
exports.searchBooks = searchBooks;
// Update book (admin only)
const updateBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const updateData = Object.assign({}, req.body);
        if ((_a = req.file) === null || _a === void 0 ? void 0 : _a.path)
            updateData.image = req.file.path;
        const book = yield book_1.default.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
        });
        if (!book)
            return next(new errorHandler_1.ValidationError("Book not found"));
        res.json({ message: "Book updated", book });
    }
    catch (error) {
        next(error);
    }
});
exports.updateBook = updateBook;
// Delete book (admin only)
const deleteBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield book_1.default.findByIdAndDelete(req.params.id);
        if (!book)
            return next(new errorHandler_1.ValidationError("Book not found"));
        res.json({ message: "Book deleted" });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteBook = deleteBook;
