"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.UnauthorizedError = exports.ValidationError = void 0;
class ValidationError extends Error {
    constructor(message, details) {
        super(message);
        this.statusCode = 400;
        this.details = details;
    }
}
exports.ValidationError = ValidationError;
class UnauthorizedError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 401;
    }
}
exports.UnauthorizedError = UnauthorizedError;
const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    const details = err.details || null;
    res.status(statusCode).json({
        message,
        details,
    });
};
exports.errorHandler = errorHandler;
