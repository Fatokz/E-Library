import { NextFunction } from "express";
import crypto from "crypto";
import { sendMail } from "./Mailer";
import { ValidationError } from "./errorHandler";
import redis from "../packages/redis";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateRegistration = (data: any, userType: "user" | "admin") => {
  const { name, email, password } = data;
  if (!name || !email || !password) {
    throw new ValidationError("All fields are required");
  }
  if (!emailRegex.test(email)) {
    throw new ValidationError("Invalid email format", { field: "email" });
  }
};

export const checkOtpRestrictions = async (
  email: string,
  next: NextFunction
) => {
  if (await redis.get(`otp_lock:${email}`)) {
    return next(
      new ValidationError(
        "Please wait 30 minutes before requesting a new OTP",
        {
          field: "otp",
        }
      )
    );
  }
  if (await redis.get(`otp_spam_lock:${email}`)) {
    return next(
      new ValidationError(
        "Too many requests, Please wait 1 hour before requesting a new OTP",
        {
          field: "otp",
        }
      )
    );
  }
  if (await redis.get(`otp_cooldown:${email}`)) {
    return next(
      new ValidationError(
        "Please wait 60 seconds before requesting a new OTP",
        {
          field: "otp",
        }
      )
    );
  }
};

export const trackOtpRequests = async (email: string, next: NextFunction) => {
  const otpRequestKey = `otp_request_count:${email}`;
  const requestCount = parseInt((await redis.get(otpRequestKey)) || "0");
  if (requestCount >= 3) {
    await redis.set(`otp_spam_lock:${email}`, "true", "EX", 3600);
    return next(
      new ValidationError(
        "Too many requests, Please wait 1 hour before requesting a new OTP",
        {
          field: "otp",
        }
      )
    );
  }
  await redis.set(otpRequestKey, requestCount + 1, "EX", 3600);
};

export const sendOtp = async (
  name: string,
  email: string,
  template: string
) => {
  const otp = crypto.randomInt(1000, 9999).toString();
  await sendMail(email, "Verify your email", template, { name, otp });
  await redis.set(`otp:${email}`, otp, "EX", 300);
  await redis.set(`otp_timeout:${email}`, "true", "EX", 60);
};

export const verifyOtp = async (
  email: string,
  otp: string,
  next: NextFunction
) => {
  const storedOtp = await redis.get(`otp:${email}`);
  if (!storedOtp) {
    throw new ValidationError("OTP expired or invalid", { field: "otp" });
  }
  const failedAttempts = parseInt(
    (await redis.get(`otp_failed_attempts:${email}`)) || "0"
  );

  if (storedOtp !== otp) {
    if (failedAttempts >= 3) {
      await redis.set(`otp_lock:${email}`, "true", "EX", 1800);
      await redis.del(`otp:${email}`);
      throw new ValidationError(
        "Too many failed attempts, Please wait 30 minutes before requesting a new OTP",
        {
          field: "otp",
        }
      );
    }
    await redis.set(
      `otp_failed_attempts:${email}`,
      failedAttempts + 1,
      "EX",
      1800
    );
    throw new ValidationError(
      `Invalid OTP you have ${3 - failedAttempts} ${
        3 - failedAttempts > 1 ? "tries" : "try"
      } left`,
      { field: "otp" }
    );
  }
  await redis.del(`otp:${email}`);
  await redis.del(`otp_failed_attempts:${email}`);
};
