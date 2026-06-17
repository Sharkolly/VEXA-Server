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
    category: {
      type: String,
        required: [true, "Please provide a category"],
      unique: false,
    },
    bankDetails: {
      accountNumber: String,
      bankCode: String,
      accountName: String,
    },
    uuid: String,
    // lastName: {
    //   type: String,
    //   //   required: [true, "Please provide a last name"],
    //   unique: false,
    // },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: [true, "Email already exists"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
    },
    phone: String,
  },
  { timestamps: true },
);

const Admin = model("Admin", ADMINDETAILS);

export default Admin;
