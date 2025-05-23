"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const isAdmin_1 = require("../middleware/isAdmin");
const isAuthenticated_1 = require("../middleware/isAuthenticated");
const multer_middleware_1 = __importDefault(require("../middleware/multer.middleware"));
const bookController_1 = require("../controller/book/bookController");
const router = express_1.default.Router();
router.get("/", bookController_1.getAllBooks);
router.get("/:id", bookController_1.getBookById);
router.get("/search", bookController_1.searchBooks);
router.put("/:id", isAuthenticated_1.isAuthenticated, isAdmin_1.isAdmin, multer_middleware_1.default.single("image"), bookController_1.updateBook);
router.delete("/:id", isAuthenticated_1.isAuthenticated, isAdmin_1.isAdmin, bookController_1.deleteBook);
exports.default = router;
