import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../model/user";
import Admin from "../model/admin";
import { UnauthorizedError } from "../utils/errorHandler";

export const isAuthenticated = async (
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
    const decoded: any = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string
    );

    let user = await User.findById(decoded.id);
    if (!user) {
      user = await Admin.findById(decoded.id);
      if (!user) throw new UnauthorizedError("Not authorized");
    }

    (req as any).user = user;
    next();
  } catch (error) {
    next(new UnauthorizedError("Invalid or expired token"));
  }
};