import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ADMINSIGNUPTODB } from "../services/auth.services";
import Admin from "../models/Admin";

export const AdminSignup = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const {
    firstName,
    lastName,
    businessName,
    email,
    password,
    category,
    bankName,
    accountNumber,
    accountName,
    phoneNumber,
  } = req.body;

  if (!password || !email) {
    return res
      .status(403)
      .json({ message: "Complete the form", status: false });
  }
  if (
    !firstName ||
    !lastName ||
    !password ||
    !email ||
    !businessName ||
    !category ||
    !bankName ||
    !accountNumber ||
    !accountName ||
    !phoneNumber
  ) {
    return res
      .status(403)
      .json({ message: "Complete the form", status: false });
  }

  const regexForValidPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

  const regexForValidEmail = /^[a-zA-Z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  if (!regexForValidEmail.test(email)) {
    return res.status(403).json({
      message: "Email is not a valid email",
      success: false,
      type: "EMAIL",
    });
  }

  if (!regexForValidPassword.test(password)) {
    return res.status(403).json({
      message:
        "Password must have minimum of 8 characters, 1 Uppercase Letter, 1 Lowercase Letter, 1 Number and 1 Special Character",
      type: "PASSWORD",
      success: false,
    });
  }

  try {
    const AdminExists = await Admin.findOne({ email });

    if (AdminExists)
      return res.status(401).json({ message: "Email Exists", success: false });

    const hashedPassword = await bcrypt.hash(password, 10);

    const { adminIdToString } = await ADMINSIGNUPTODB({
      hashedPassword,
      email,
      firstName,
      lastName,
      phoneNumber,
      businessName,
      category,
      bankName,
      accountNumber,
      accountName,
    });

    return res.status(200).json({
      success: true,
      message: "Admin Account Created Successfully",
    });
  } catch (err: unknown) {
    next(err);
  }
};
