"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const isAuthenticated_1 = require("../middleware/isAuthenticated");
const commentController_1 = require("../controller/comment/commentController");
const router = express_1.default.Router();
router.post("/:bookId", isAuthenticated_1.isAuthenticated, commentController_1.addComment);
router.delete("/:commentId", isAuthenticated_1.isAuthenticated, commentController_1.deleteComment);
exports.default = router;
