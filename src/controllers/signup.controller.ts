import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Person from "../models/User";
import { USERSIGNUPTODB } from "../services/auth.services";

export const signup = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !password || !email) {
    return res.status(403).json({ message: "Complete the form", status: false });
  }

  const regexForValidPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

  const regexForValidEmail = /^[a-zA-Z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  if (!regexForValidEmail.test(email)) {
    return res
      .status(403)
      .json({ message: "Email is not a valid email", success: false, type: 'EMAIL' });
  }

  if (!regexForValidPassword.test(password)) {
    return res.status(403).json({
      message:
        "Password must have minimum of 8 characters, 1 Uppercase Letter, 1 Lowercase Letter, 1 Number and 1 Special Character", type: 'PASSWORD',
      success: false,
    });
  }

  try {
    const UserExists = await Person.findOne({ email });

    if (UserExists)
      return res.status(401).json({ message: "user exists", success: false });

    const hashedPassword = await bcrypt.hash(password, 10);

    const { userIdToString } = await USERSIGNUPTODB({
      email,
      hashedPassword,
      firstName,
      lastName,
    });

    return res
      .status(200)
      .json({ success: true, message: "Account Created Successfully"});
  } catch (err: unknown) {}
};
