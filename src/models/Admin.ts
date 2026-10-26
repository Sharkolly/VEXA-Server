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
      unique: true,
    },
    accountName: {
      type: String,
      required: [true, "Please provide a bank account name"],
      unique: false,
    },
    businessDescription: {
      type: String,
      required: [true, "Please provide your business description"],
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
    bankCode: {
      type: String,
      required: [true, "Please provide a bank code"],
    },
   
    subCategories: {
      type: [String],
      required: true,
      validate: {
        validator: function (value: string) {
          return value.length > 0;
        },
        message: "Select at least one subcategory.",
      },
    },
    categories: {
      type: [String],
      required: true,
      validate: {
        validator: function (value: string) {
          return value.length > 0;
        },
        message: "Select at least one category.",
      },
    },
    paystackSubaccountCode: {
      type: String,
      required: [true, "Please provide your paystack code"],
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
