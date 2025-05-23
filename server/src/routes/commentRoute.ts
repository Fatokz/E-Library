import express from "express";
import { isAuthenticated } from "../middleware/isAuthenticated";
import {
  addComment,
  deleteComment,
} from "../controller/comment/commentController";

const router = express.Router();

router.post("/:bookId", isAuthenticated, addComment);
router.delete("/:commentId", isAuthenticated, deleteComment);

export default router;
