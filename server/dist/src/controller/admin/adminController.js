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
exports.getAllBorrowedBooks = exports.updateUser = exports.deleteUser = exports.getAllUsers = exports.addBook = void 0;
const errorHandler_1 = require("../../utils/errorHandler");
const book_1 = __importDefault(require("../../model/book"));
const user_1 = __importDefault(require("../../model/user"));
const borrow_1 = __importDefault(require("../../model/borrow"));
// Add a book (admin only)
const addBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { title, description, author, category, pages, publishedDate, availability, isPaid, price, status, isInShelf, } = req.body;
        const image = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
        // Business rules
        if (availability === "ebook" && status === "borrowable") {
            return next(new errorHandler_1.ValidationError("Ebooks cannot be borrowable"));
        }
        // if (availability === "hardcopy" && !isPaid) {
        //   return next(new ValidationError("Hardcopy books must be paid"));
        // }
        const book = new book_1.default({
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
            createdBy: req.admin._id,
        });
        yield book.save();
        res.status(201).json({ message: "Book added", book });
    }
    catch (error) {
        next(error);
    }
});
exports.addBook = addBook;
// Get all users (admin only)
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.default.find().select("-password");
        res.status(200).json({ users });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllUsers = getAllUsers;
// Delete a user (admin only)
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield user_1.default.findByIdAndDelete(id);
        if (!user) {
            return next(new errorHandler_1.ValidationError("User not found"));
        }
        res.status(200).json({ message: "User deleted successfully" });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteUser = deleteUser;
// Update a user (admin only)
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const update = req.body;
        const user = yield user_1.default.findByIdAndUpdate(id, update, { new: true }).select("-password");
        if (!user) {
            return next(new errorHandler_1.ValidationError("User not found"));
        }
        res.status(200).json({ message: "User updated", user });
    }
    catch (error) {
        next(error);
    }
});
exports.updateUser = updateUser;
const getAllBorrowedBooks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find all borrows with status "borrowed"
        const borrows = yield borrow_1.default.find({ status: "borrowed" })
            .populate("user", "-password")
            .populate("book");
        res.status(200).json({ borrows });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllBorrowedBooks = getAllBorrowedBooks;
