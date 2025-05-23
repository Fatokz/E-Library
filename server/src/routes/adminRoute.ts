import express from "express";
import { addBook } from "../controller/admin/adminController";
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

export default router;
