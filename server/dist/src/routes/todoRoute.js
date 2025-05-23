"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const isAuthenticated_1 = require("../middleware/isAuthenticated");
const todoController_1 = require("../controller/user/todoController");
const router = express_1.default.Router();
router.post("/", isAuthenticated_1.isAuthenticated, todoController_1.addTodo);
router.get("/", isAuthenticated_1.isAuthenticated, todoController_1.getTodos);
router.put("/:id", isAuthenticated_1.isAuthenticated, todoController_1.updateTodo);
router.delete("/:id", isAuthenticated_1.isAuthenticated, todoController_1.deleteTodo);
exports.default = router;
