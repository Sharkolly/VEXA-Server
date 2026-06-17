import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import logger from "../config/logger";
import { checkAdminExists } from "../services/auth.services";

export const AdminLogin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res
      .status(403)
      .json({ success: false, message: "Please fill the forms" });
  try {
    const user = await checkAdminExists(email);
    if (!user) {
      return res.status(403).json({
        message: "Email is not registered. Please Sign Up.",
        success: false,
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res
        .status(401)
        .json({ message: "Invalid Email or Password", success: false });
    }

    const jwtSecret = process.env.JWT_SECRET_KEY;
    if (!jwtSecret) {
      logger.error("JWT_SECRET_KEY is not defined in environment variables");
      return res
        .status(500)
        .json({ message: "Server configuration error", success: false });
    }

    const token = jwt.sign({ _id: user._id }, jwtSecret, {
      expiresIn: "5d",
    });

    return res
      .status(200)
      .json({ success: true, message: "Login Succesful", token });
  } catch (err: any) {
    next(err);
  }
};
