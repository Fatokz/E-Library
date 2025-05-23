import express from "express";
import { isAuthenticated } from "../middleware/isAuthenticated";
import {
  borrowBook,
  returnBook,
  getUserBorrows,
} from "../controller/borrow/borrowController";

const router = express.Router();

router.post("/:bookId", isAuthenticated, borrowBook);
router.post("/return/:borrowId", isAuthenticated, returnBook);
router.get("/", isAuthenticated, getUserBorrows);

export default router;
