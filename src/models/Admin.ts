import { Schema, model } from "mongoose";

const ADMINDETAILS = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please provide a first name"],
      unique: false,
    },
    lastName: {
      type: String,
      required: [true, "Please provide a last name"],
      unique: false,
    },
    businessName: {
      type: String,
      required: [true, "Please provide a business name"],
      unique: false,
    },
    accountName: {
      type: String,
      required: [true, "Please provide a bank account name"],
      unique: false,
    },
    accountNumber: {
      type: Number,
      required: [true, "Please provide a bank account number"],
      unique: false,
    },
    phoneNumber: {
      type: Number,
      required: [true, "Please provide your phone number"],
      unique: true,
    },
    bankName: {
      type: String,
      required: [true, "Please provide a bank name"],
      unique: false,
    },
    category: {
      type: String,
      required: [true, "Please provide a category"],
      unique: false,
    },

    uuid: String,
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: [true, "Email already exists"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
    },
  },
  { timestamps: true },
);

const Admin = model("Admin", ADMINDETAILS);

export default Admin;
