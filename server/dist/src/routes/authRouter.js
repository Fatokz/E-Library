"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controller/auth/authController");
const isAdmin_1 = require("../middleware/isAdmin");
const router = express_1.default.Router();
// AUTHENTICATION ROUTE
// User routes
router.post("/user-register", authController_1.userRegistration);
router.post("/verify-user", authController_1.verifyUser);
router.post("/login", authController_1.login);
// Admin routes
router.post("/admin-register", isAdmin_1.isAdmin, authController_1.adminRegistration);
router.post("/verify-admin", authController_1.verifyAdmin);
router.post("/refresh-token", authController_1.refreshAccessToken);
exports.default = router;
