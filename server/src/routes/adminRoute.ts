import express from "express";
import {
  addBook,
  getAllUsers,
  deleteUser,
  updateUser,
  getAllBorrowedBooks,
} from "../controller/admin/adminController";
import { isAdmin } from "../middleware/isAdmin";
import { isAuthenticated } from "../middleware/isAuthenticated";
import upload from "../middleware/multer.middleware";


const router = express.Router();

router.post(
  "/add-book",
  upload.single("image"),
  isAuthenticated,
  isAdmin,
  addBook,
);
router.get("/users", isAuthenticated, isAdmin, getAllUsers);
router.get(
  "/borrowed-books",
  isAuthenticated,
  isAdmin,
  getAllBorrowedBooks
);
router.delete("/users/:id", isAuthenticated, isAdmin, deleteUser);
router.put("/users/:id", isAuthenticated, isAdmin, updateUser);

export default router;
