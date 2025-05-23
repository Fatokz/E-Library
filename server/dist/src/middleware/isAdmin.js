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
exports.isAdmin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const admin_1 = __importDefault(require("../model/admin"));
const errorHandler_1 = require("../utils/errorHandler");
const isAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new errorHandler_1.UnauthorizedError("No token provided");
        }
        const token = authHeader.split(" ")[1];
        let decoded;
        try {
            decoded = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
        }
        catch (err) {
            return next(new errorHandler_1.UnauthorizedError("Invalid or expired token"));
        }
        // Safely extract id from decoded payload
        const adminId = typeof decoded === "object" && decoded !== null
            ? decoded.id
            : undefined;
        if (!adminId) {
            return next(new errorHandler_1.UnauthorizedError("Invalid token payload"));
        }
        const admin = yield admin_1.default.findById(adminId);
        if (!admin) {
            throw new errorHandler_1.UnauthorizedError("Not authorized as admin");
        }
        req.admin = admin;
        next();
    }
    catch (error) {
        next(new errorHandler_1.UnauthorizedError("Invalid or expired token"));
    }
});
exports.isAdmin = isAdmin;
