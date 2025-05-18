import { Request, Response, NextFunction } from "express";

export class ValidationError extends Error {
  statusCode: number;
  details?: any;

  constructor(message: string, details?: any) {
    super(message);
    this.statusCode = 400;
    this.details = details;
  }
}

export class UnauthorizedError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = 401;
  }
}

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  const details = err.details || null;

  res.status(statusCode).json({
    message,
    details,
  });
};