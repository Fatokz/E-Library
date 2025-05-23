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
exports.verifyOtp = exports.sendOtp = exports.trackOtpRequests = exports.checkOtpRestrictions = exports.validateRegistration = void 0;
const crypto_1 = __importDefault(require("crypto"));
const Mailer_1 = require("./Mailer");
const errorHandler_1 = require("./errorHandler");
const redis_1 = __importDefault(require("../packages/redis"));
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const validateRegistration = (data, userType) => {
    const { name, email, password } = data;
    if (!name || !email || !password) {
        throw new errorHandler_1.ValidationError("All fields are required");
    }
    if (!emailRegex.test(email)) {
        throw new errorHandler_1.ValidationError("Invalid email format", { field: "email" });
    }
};
exports.validateRegistration = validateRegistration;
const checkOtpRestrictions = (email, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield redis_1.default.get(`otp_lock:${email}`)) {
        return next(new errorHandler_1.ValidationError("Please wait 30 minutes before requesting a new OTP", {
            field: "otp",
        }));
    }
    if (yield redis_1.default.get(`otp_spam_lock:${email}`)) {
        return next(new errorHandler_1.ValidationError("Too many requests, Please wait 1 hour before requesting a new OTP", {
            field: "otp",
        }));
    }
    if (yield redis_1.default.get(`otp_cooldown:${email}`)) {
        return next(new errorHandler_1.ValidationError("Please wait 60 seconds before requesting a new OTP", {
            field: "otp",
        }));
    }
});
exports.checkOtpRestrictions = checkOtpRestrictions;
const trackOtpRequests = (email, next) => __awaiter(void 0, void 0, void 0, function* () {
    const otpRequestKey = `otp_request_count:${email}`;
    const requestCount = parseInt((yield redis_1.default.get(otpRequestKey)) || "0");
    if (requestCount >= 3) {
        yield redis_1.default.set(`otp_spam_lock:${email}`, "true", "EX", 3600);
        return next(new errorHandler_1.ValidationError("Too many requests, Please wait 1 hour before requesting a new OTP", {
            field: "otp",
        }));
    }
    yield redis_1.default.set(otpRequestKey, requestCount + 1, "EX", 3600);
});
exports.trackOtpRequests = trackOtpRequests;
const sendOtp = (name, email, template) => __awaiter(void 0, void 0, void 0, function* () {
    const otp = crypto_1.default.randomInt(1000, 9999).toString();
    yield (0, Mailer_1.sendMail)(email, "Verify your email", template, { name, otp });
    yield redis_1.default.set(`otp:${email}`, otp, "EX", 300);
    yield redis_1.default.set(`otp_timeout:${email}`, "true", "EX", 60);
});
exports.sendOtp = sendOtp;
const verifyOtp = (email, otp, next) => __awaiter(void 0, void 0, void 0, function* () {
    const storedOtp = yield redis_1.default.get(`otp:${email}`);
    if (!storedOtp) {
        throw new errorHandler_1.ValidationError("OTP expired or invalid", { field: "otp" });
    }
    const failedAttempts = parseInt((yield redis_1.default.get(`otp_failed_attempts:${email}`)) || "0");
    if (storedOtp !== otp) {
        if (failedAttempts >= 3) {
            yield redis_1.default.set(`otp_lock:${email}`, "true", "EX", 1800);
            yield redis_1.default.del(`otp:${email}`);
            throw new errorHandler_1.ValidationError("Too many failed attempts, Please wait 30 minutes before requesting a new OTP", {
                field: "otp",
            });
        }
        yield redis_1.default.set(`otp_failed_attempts:${email}`, failedAttempts + 1, "EX", 1800);
        throw new errorHandler_1.ValidationError(`Invalid OTP you have ${3 - failedAttempts} ${3 - failedAttempts > 1 ? "tries" : "try"} left`, { field: "otp" });
    }
    yield redis_1.default.del(`otp:${email}`);
    yield redis_1.default.del(`otp_failed_attempts:${email}`);
});
exports.verifyOtp = verifyOtp;
