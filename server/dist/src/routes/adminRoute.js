"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminController_1 = require("../controller/admin/adminController");
const isAdmin_1 = require("../middleware/isAdmin");
const isAuthenticated_1 = require("../middleware/isAuthenticated");
const multer_middleware_1 = __importDefault(require("../middleware/multer.middleware"));
const router = express_1.default.Router();
router.post("/add-book", multer_middleware_1.default.single("image"), isAuthenticated_1.isAuthenticated, isAdmin_1.isAdmin, adminController_1.addBook);
router.get("/users", isAuthenticated_1.isAuthenticated, isAdmin_1.isAdmin, adminController_1.getAllUsers);
router.get("/borrowed-books", isAuthenticated_1.isAuthenticated, isAdmin_1.isAdmin, adminController_1.getAllBorrowedBooks);
router.delete("/users/:id", isAuthenticated_1.isAuthenticated, isAdmin_1.isAdmin, adminController_1.deleteUser);
router.put("/users/:id", isAuthenticated_1.isAuthenticated, isAdmin_1.isAdmin, adminController_1.updateUser);
exports.default = router;
