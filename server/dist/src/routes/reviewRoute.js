"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const isAuthenticated_1 = require("../middleware/isAuthenticated");
const reviewController_1 = require("../controller/review/reviewController");
const router = express_1.default.Router();
router.post("/:bookId", isAuthenticated_1.isAuthenticated, reviewController_1.addReview);
router.delete("/:reviewId", isAuthenticated_1.isAuthenticated, reviewController_1.deleteReview);
exports.default = router;
