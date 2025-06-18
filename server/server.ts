import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./src/routes/authRouter";
import adminRoute from "./src/routes/adminRoute";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
// import swaggerUi from "swagger-ui-express";
import { errorHandler } from "./src/utils/errorHandler";
import connection from "./src/utils/database/connect";
// const swaggerDocumentation = require("./src/swagger-output.json");

import bookRoute from "./src/routes/bookRoute";
import reviewRoute from "./src/routes/reviewRoute";
import commentRoute from "./src/routes/commentRoute";
import borrowRoute from "./src/routes/borrowRoute";
import todoRoute from "./src/routes/todoRoute";

const port = process.env.PORT || 8080;

const app = express();
app.use(
  cors({
    origin: ["https://booksync-amb.vercel.app"],
    // origin: ["http://localhost:5173"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(morgan("dev"));
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: (req: any) => (req.user ? 1000 : 100),
    message: "Too many requests, please try again later.",
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req: any) => req.ip,
  })
);
app.use(express.static("public"));
app.use(cookieParser());
app.use(errorHandler);
connection(process.env.MONGO_URI!);
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocumentation));
// app.get("/docs/json", (req, res) => {
//   res.json(swaggerDocumentation);
// });
app.use("/api/auth", authRouter);
app.use("/api/admin", adminRoute);
app.use("/api/books", bookRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/comments", commentRoute);
app.use("/api/borrows", borrowRoute);
app.use("/api/todos", todoRoute);
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
