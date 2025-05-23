import express from "express";
import { isAuthenticated } from "../middleware/isAuthenticated";
import { addReview, deleteReview } from "../controller/review/reviewController";

const router = express.Router();

router.post("/:bookId", isAuthenticated, addReview);
router.delete("/:reviewId", isAuthenticated, deleteReview);

export default router;
