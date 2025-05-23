"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminController_1 = require("../controller/admin/adminController");
const isAdmin_1 = require("../middleware/isAdmin");
const multer_middleware_1 = __importDefault(require("../middleware/multer.middleware"));
const isAuthenticated_1 = require("../middleware/isAuthenticated");
const router = express_1.default.Router();
router.post("/add-book", isAuthenticated_1.isAuthenticated, isAdmin_1.isAdmin, multer_middleware_1.default.single("image"), adminController_1.addBook);
exports.default = router;
