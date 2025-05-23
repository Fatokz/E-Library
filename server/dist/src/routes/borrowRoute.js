"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const isAuthenticated_1 = require("../middleware/isAuthenticated");
const borrowController_1 = require("../controller/borrow/borrowController");
const router = express_1.default.Router();
router.post("/:bookId", isAuthenticated_1.isAuthenticated, borrowController_1.borrowBook);
router.post("/return/:borrowId", isAuthenticated_1.isAuthenticated, borrowController_1.returnBook);
router.get("/", isAuthenticated_1.isAuthenticated, borrowController_1.getUserBorrows);
exports.default = router;
