import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ADMINSIGNUPTODB } from "../services/auth.services";
import Admin from "../models/Admin";
import axios from "axios";

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
    businessDescription,
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
    !phoneNumber ||
    !businessDescription
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
  const normalizePhone = (phone: number) => {
    let phoneNumber = String(phone).trim();

    if (phoneNumber.startsWith("0")) {
      const newNumber = "+234" + phoneNumber.slice(1);
      return Number(newNumber);
    }

    if (phoneNumber.startsWith("234")) {
      const newNumber = "+" + phoneNumber;
      return Number(newNumber);
    }

    if (phoneNumber.startsWith("+234")) {
      return Number(phoneNumber);
    }

    const newNumber = "+234" + phoneNumber;
    return Number(newNumber);
  };

  try {
    const AdminExists = await Admin.findOne({ email });
    if (AdminExists)
      return res.status(401).json({ message: "Email Exists", success: false });

    const formattedPhone = Number(normalizePhone(phoneNumber));

    const AdminNumberExists = await Admin.findOne({
      phoneNumber: formattedPhone,
    });

    if (AdminNumberExists)
      return res
        .status(401)
        .json({ message: "Phone Number Exists", success: false });

    const response = await axios.post(
      "https://api.paystack.co/subaccount",
      {
        business_name: businessName,
        settlement_bank: bankName.code,
        account_number: accountNumber,
        percentage_charge: 10,
        primary_contact_email: email,
        primary_contact_name: accountName,
        primary_contact_phone: phoneNumber,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

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
      businessDescription,
    });

    return res.status(200).json({
      success: true,
      message: "Admin Account Created Successfully",
    });
  } catch (err: unknown) {
    next(err);
  }
};
