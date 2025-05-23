import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./src/routes/authRouter";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import swaggerUi from "swagger-ui-express";
import { errorHandler } from "./src/utils/errorHandler";
import connection from "./src/utils/database/connect";
const swaggerDocumentation = require("./src/swagger-output.json");

const port = process.env.PORT || 8080;

const app = express();

app.use(
  cors({
    origin: "*",
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
app.use(cookieParser());
app.use(errorHandler);
connection(process.env.MONGO_URI!);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocumentation));
app.get("/docs/json", (req, res) => {
  res.json(swaggerDocumentation);
});
app.use("/api/auth", authRouter);
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
