"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.getTodos = exports.addTodo = void 0;
const todo_1 = __importDefault(require("../../model/todo"));
const errorHandler_1 = require("../../utils/errorHandler");
// Add a todo
const addTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, targetCompletedDate } = req.body;
        if (!title || !targetCompletedDate) {
            return next(new errorHandler_1.ValidationError("Title and target date required"));
        }
        const todo = new todo_1.default({
            user: req.user._id,
            title,
            targetCompletedDate,
        });
        yield todo.save();
        res.status(201).json({ message: "Todo created", todo });
    }
    catch (error) {
        next(error);
    }
});
exports.addTodo = addTodo;
// Get all todos for user
const getTodos = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user._id;
        const todos = yield todo_1.default.find({ user: userId });
        res.json(todos);
    }
    catch (error) {
        next(error);
    }
});
exports.getTodos = getTodos;
// Update a todo
const updateTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { completed, title, targetCompletedDate } = req.body;
        const todo = yield todo_1.default.findOneAndUpdate({ _id: id, user: req.user._id }, { completed: "true", title, targetCompletedDate }, { new: true });
        if (!todo)
            return next(new errorHandler_1.ValidationError("Todo not found"));
        res.json({ message: "Todo updated", todo });
    }
    catch (error) {
        next(error);
    }
});
exports.updateTodo = updateTodo;
// // complete a todo
// export const completeTodo = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { id } = req.params;
//     const updateData = req.body;
//     const todo = await Todo.findOneAndUpdate(
//       { _id: id, user: (req as any).user._id },
//       updateData,
//       { new: true }
//     );
//     if (!todo) return next(new ValidationError("Todo not found"));
//     res.json({ message: "Todo updated", todo });
//   } catch (error) {
//     next(error);
//   }
// };
// Delete a todo
const deleteTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const todo = yield todo_1.default.findOneAndDelete({
            _id: id,
            user: req.user._id,
        });
        if (!todo)
            return next(new errorHandler_1.ValidationError("Todo not found"));
        res.json({ message: "Todo deleted" });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteTodo = deleteTodo;
