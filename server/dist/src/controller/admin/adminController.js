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
exports.addBook = void 0;
const errorHandler_1 = require("../../utils/errorHandler");
const book_1 = __importDefault(require("../../model/book"));
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
