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
exports.refreshAccessToken = exports.verifyAdmin = exports.adminRegistration = exports.login = exports.verifyUser = exports.userRegistration = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errorHandler_1 = require("../../utils/errorHandler");
const validateAuth_1 = require("../../utils/validateAuth");
const user_1 = __importDefault(require("../../model/user"));
const admin_1 = __importDefault(require("../../model/admin"));
const setCookies_1 = require("../../utils/cookies/setCookies.");
const userRegistration = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, validateAuth_1.validateRegistration)(req.body, "user");
        const { name, email } = req.body;
        const existingUser = yield user_1.default.findOne({ email });
        if (existingUser) {
            return next(new errorHandler_1.ValidationError("User already exists", { field: "email" }));
        }
        yield (0, validateAuth_1.checkOtpRestrictions)(email, next);
        yield (0, validateAuth_1.trackOtpRequests)(email, next);
        yield (0, validateAuth_1.sendOtp)(name, email, "user-verification-mail");
        res.status(200).json({
            message: "OTP sent successfully, please check your email",
        });
    }
    catch (error) {
        next(error);
    }
});
exports.userRegistration = userRegistration;
const verifyUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, otp, password } = req.body;
        if (!email || !otp || !password) {
            return next(new errorHandler_1.ValidationError("All fields are required"));
        }
        yield (0, validateAuth_1.verifyOtp)(email, otp, next);
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const newUser = new user_1.default({
            name: req.body.name,
            email,
            password: hashedPassword,
        });
        yield newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    }
    catch (error) {
        next(error);
    }
});
exports.verifyUser = verifyUser;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return next(new errorHandler_1.ValidationError("All fields are required"));
        }
        // Try to find user
        let account = yield user_1.default.findOne({ email });
        let role = "user";
        if (!account) {
            // Try to find admin
            account = yield admin_1.default.findOne({ email });
            role = "admin";
        }
        if (!account) {
            return next(new errorHandler_1.ValidationError("Invalid credentials"));
        }
        const isPasswordValid = yield bcryptjs_1.default.compare(password, account.password);
        if (!isPasswordValid) {
            return next(new errorHandler_1.ValidationError("Invalid credentials"));
        }
        const accessToken = jsonwebtoken_1.default.sign({ id: account.id, role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
        const refreshToken = jsonwebtoken_1.default.sign({ id: account.id, role }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
        (0, setCookies_1.setCookie)(res, "accessToken", accessToken);
        (0, setCookies_1.setCookie)(res, "refreshToken", refreshToken);
        res.status(200).json({
            message: "Login successful",
            accessToken,
            refreshToken,
            role,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.login = login;
const adminRegistration = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, validateAuth_1.validateRegistration)(req.body, "admin");
        const { name, email } = req.body;
        const existingAdmin = yield admin_1.default.findOne({ email });
        if (existingAdmin) {
            return next(new errorHandler_1.ValidationError("Admin already exists", { field: "email" }));
        }
        yield (0, validateAuth_1.checkOtpRestrictions)(email, next);
        yield (0, validateAuth_1.trackOtpRequests)(email, next);
        yield (0, validateAuth_1.sendOtp)(name, email, "admin-verification-mail");
        res.status(200).json({
            message: "OTP sent successfully, please check your email",
        });
    }
    catch (error) {
        next(error);
    }
});
exports.adminRegistration = adminRegistration;
const verifyAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, otp, password } = req.body;
        if (!name || !email || !otp || !password) {
            return next(new errorHandler_1.ValidationError("All fields are required"));
        }
        yield (0, validateAuth_1.verifyOtp)(email, otp, next);
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const newAdmin = new admin_1.default({
            name,
            email,
            password: hashedPassword,
        });
        yield newAdmin.save();
        res.status(201).json({ message: "Admin registered successfully" });
    }
    catch (error) {
        next(error);
    }
});
exports.verifyAdmin = verifyAdmin;
const refreshAccessToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get refresh token from cookie or body
        const refreshToken = req.cookies.refreshToken || req.body.refreshToken;
        if (!refreshToken) {
            res.status(401).json({ message: "No refresh token provided" });
            return;
        }
        // Verify refresh token
        jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.status(403).json({ message: "Invalid refresh token" });
                return;
            }
            // Issue new access token
            const accessToken = jsonwebtoken_1.default.sign({ id: decoded.id, role: decoded.role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
            // Optionally, issue a new refresh token here if you want to rotate
            // const newRefreshToken = jwt.sign(
            //   { id: decoded.id, role: decoded.role },
            //   process.env.REFRESH_TOKEN_SECRET as string,
            //   { expiresIn: "7d" }
            // );
            // setCookie(res, "refreshToken", newRefreshToken);
            (0, setCookies_1.setCookie)(res, "accessToken", accessToken);
            res.status(200).json({ accessToken });
        });
    }
    catch (error) {
        next(error);
    }
});
exports.refreshAccessToken = refreshAccessToken;
