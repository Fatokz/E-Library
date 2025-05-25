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

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new ValidationError("All fields are required"));
    }

    // Try to find user
    let account = await User.findOne({ email });
    let role = "user";
    if (!account) {
      // Try to find admin
      account = await Admin.findOne({ email });
      role = "admin";
    }
    if (!account) {
      return next(new ValidationError("Invalid credentials"));
    }

    const isPasswordValid = await bcrypt.compare(password, account.password);
    if (!isPasswordValid) {
      return next(new ValidationError("Invalid credentials"));
    }

    const accessToken = jwt.sign(
      { id: account.id, role },
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: "15m" }
    );
    const refreshToken = jwt.sign(
      { id: account.id, role },
      process.env.REFRESH_TOKEN_SECRET as string,
      { expiresIn: "7d" }
    );

    setCookie(res, "accessToken", accessToken);
    setCookie(res, "refreshToken", refreshToken);
    res.status(200).json({
      message: "Login successful",
      accessToken,
      refreshToken,
      role,
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

export const verifyAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, otp, password } = req.body;

    if (!name || !email || !otp || !password) {
      return next(new ValidationError("All fields are required"));
    }

    await verifyOtp(email, otp, next);

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword,
    });

    await newAdmin.save();

    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    next(error);
  }
};

export const refreshAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get refresh token from cookie or body
    const refreshToken = req.cookies.refreshToken || req.body.refreshToken;
    if (!refreshToken) {
       res.status(401).json({ message: "No refresh token provided" });
       return
    }

    // Verify refresh token
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET as string,
      (err: any, decoded: any) => {
        if (err) {
           res.status(403).json({ message: "Invalid refresh token" });
           return 
        }

        // Issue new access token
        const accessToken = jwt.sign(
          { id: decoded.id, role: decoded.role },
          process.env.ACCESS_TOKEN_SECRET as string,
          { expiresIn: "15m" }
        );

        // Optionally, issue a new refresh token here if you want to rotate
        // const newRefreshToken = jwt.sign(
        //   { id: decoded.id, role: decoded.role },
        //   process.env.REFRESH_TOKEN_SECRET as string,
        //   { expiresIn: "7d" }
        // );
        // setCookie(res, "refreshToken", newRefreshToken);

        setCookie(res, "accessToken", accessToken);
       res.status(200).json({ accessToken });
      }
    );
  } catch (error) {
    next(error);
  }
};
