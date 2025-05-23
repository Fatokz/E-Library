import express from "express";
import { isAdmin } from "../middleware/isAdmin";
import { isAuthenticated } from "../middleware/isAuthenticated";
import upload from "../middleware/multer.middleware";
import {
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
  searchBooks,
} from "../controller/book/bookController";

const router = express.Router();

router.get("/", getAllBooks);
router.get("/:id", getBookById);
router.get("/search", searchBooks);

router.put(
  "/:id",
  isAuthenticated,
  isAdmin,
  upload.single("image"),
  updateBook
);
router.delete("/:id", isAuthenticated, isAdmin, deleteBook);

export default router;
