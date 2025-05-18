import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ValidationError } from "../../utils/errorHandler";
import {
  validateRegistration,
  checkOtpRestrictions,
  trackOtpRequests,
  sendOtp,
  verifyOtp,
} from "../../utils/validateAuth";
import User from "../../model/user";
import Admin from "../../model/admin";
import { setCookie } from "../../utils/cookies/setCookies.";

export const userRegistration = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    validateRegistration(req.body, "user");
    const { name, email } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(
        new ValidationError("User already exists", { field: "email" })
      );
    }

    await checkOtpRestrictions(email, next);
    await trackOtpRequests(email, next);
    await sendOtp(name, email, "user-verification-mail");

    res.status(200).json({
      message: "OTP sent successfully, please check your email",
    });
  } catch (error) {
    next(error);
  }
};

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, otp, password } = req.body;

    if (!email || !otp || !password) {
      return next(new ValidationError("All fields are required"));
    }

    await verifyOtp(email, otp, next);

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name: req.body.name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new ValidationError("All fields are required"));
    }

    const user = await User.findOne({ email });
    if (!user) {
      return next(new ValidationError("Invalid credentials"));
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return next(new ValidationError("Invalid credentials"));
    }

    const accessToken = jwt.sign(
      { id: user.id },
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: "15m" }
    );
    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.REFRESH_TOKEN_SECRET as string,
      { expiresIn: "7d" }
    );

    setCookie(res, "accessToken", accessToken);
    setCookie(res, "refreshToken", refreshToken);
    res.status(200).json({
      message: "Login successful",
      accessToken,
      refreshToken,
    });
  } catch (error) {
    next(error);
  }
};

export const adminRegistration = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    validateRegistration(req.body, "admin");
    const { name, email } = req.body;

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return next(
        new ValidationError("Admin already exists", { field: "email" })
      );
    }

    await checkOtpRestrictions(email, next);
    await trackOtpRequests(email, next);
    await sendOtp(name, email, "admin-verification-mail");

    res.status(200).json({
      message: "OTP sent successfully, please check your email",
    });
  } catch (error) {
    next(error);
  }
};
