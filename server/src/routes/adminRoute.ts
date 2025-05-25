import express from "express";
import {
  addBook,
  getAllUsers,
  deleteUser,
  updateUser,
} from "../controller/admin/adminController";
import { isAdmin } from "../middleware/isAdmin";
import upload from "../middleware/multer.middleware";
import { isAuthenticated } from "../middleware/isAuthenticated";

const router = express.Router();

router.post(
  "/add-book",
  isAuthenticated,
  isAdmin,
  upload.single("image"),
  addBook
);
router.get("/users", isAuthenticated, isAdmin, getAllUsers);
router.delete("/users/:id", isAuthenticated, isAdmin, deleteUser);
router.put("/users/:id", isAuthenticated, isAdmin, updateUser);

export default router;
