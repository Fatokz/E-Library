"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const authRouter_1 = __importDefault(require("./src/routes/authRouter"));
const adminRoute_1 = __importDefault(require("./src/routes/adminRoute"));
const morgan_1 = __importDefault(require("morgan"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const errorHandler_1 = require("./src/utils/errorHandler");
const connect_1 = __importDefault(require("./src/utils/database/connect"));
const swaggerDocumentation = require("./src/swagger-output.json");
const bookRoute_1 = __importDefault(require("./src/routes/bookRoute"));
const reviewRoute_1 = __importDefault(require("./src/routes/reviewRoute"));
const commentRoute_1 = __importDefault(require("./src/routes/commentRoute"));
const borrowRoute_1 = __importDefault(require("./src/routes/borrowRoute"));
const todoRoute_1 = __importDefault(require("./src/routes/todoRoute"));
const port = process.env.PORT || 8080;
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json({ limit: "100mb" }));
app.use(express_1.default.urlencoded({ limit: "100mb", extended: true }));
app.use((0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: (req) => (req.user ? 1000 : 100),
    message: "Too many requests, please try again later.",
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req) => req.ip,
}));
app.use(express_1.default.static("public"));
app.use((0, cookie_parser_1.default)());
app.use(errorHandler_1.errorHandler);
(0, connect_1.default)(process.env.MONGO_URI);
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocumentation));
app.get("/docs/json", (req, res) => {
    res.json(swaggerDocumentation);
});
app.use("/api/auth", authRouter_1.default);
app.use("/api/admin", adminRoute_1.default);
app.use("/api/books", bookRoute_1.default);
app.use("/api/reviews", reviewRoute_1.default);
app.use("/api/comments", commentRoute_1.default);
app.use("/api/borrows", borrowRoute_1.default);
app.use("/api/todos", todoRoute_1.default);
app.get("/", (req, res) => {
    res.send({ message: "Welcome to the Bookstore Auth API" });
});
const server = app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/api`);
});
server.on("error", (err) => {
    console.error("Server error:", err);
    process.exit(1);
});
