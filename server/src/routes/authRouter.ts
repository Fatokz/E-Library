import express, { Router } from "express";
import {
  userRegistration,
  verifyUser,
  login,
  adminRegistration,
  verifyAdmin,
} from "../controller/auth/authController";
import { isAdmin } from "../middleware/isAdmin";
import { addBook } from "../controller/admin/adminController";
import { addTodo } from "../controller/user/todoController";
import { isAuthenticated } from "../middleware/isAuthenticated";

const router: Router = express.Router();

// AUTHENTICATION ROUTE
// User routes
router.post("/user-register", userRegistration);
router.post("/verify-user", verifyUser);
router.post("/login", login);
// Admin routes
router.post("/admin-register", isAdmin, adminRegistration);
router.post("/verify-admin", verifyAdmin);

export default router;
