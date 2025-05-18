import express, { Router } from "express";
import {
  userRegistration,
  verifyUser,
  loginUser,
  adminRegistration,
} from "../controller/auth/authController";

const router: Router = express.Router();

// User routes
router.post("/user-register", userRegistration);
router.post("/verify-user", verifyUser);
router.post("/login-user", loginUser);

// Admin routes
router.post("/admin-register", adminRegistration);

export default router;