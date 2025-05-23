import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Admin from "../model/admin";
import { UnauthorizedError } from "../utils/errorHandler";

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedError("No token provided");
    }
    const token = authHeader.split(" ")[1];
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);
    } catch (err) {
      return next(new UnauthorizedError("Invalid or expired token"));
    }

    // Safely extract id from decoded payload
    const adminId =
      typeof decoded === "object" && decoded !== null
        ? (decoded as any).id
        : undefined;
    if (!adminId) {
      return next(new UnauthorizedError("Invalid token payload"));
    }

    const admin = await Admin.findById(adminId);
    if (!admin) {
      throw new UnauthorizedError("Not authorized as admin");
    }

    (req as any).admin = admin;
    next();
  } catch (error) {
    next(new UnauthorizedError("Invalid or expired token"));
  }
};
