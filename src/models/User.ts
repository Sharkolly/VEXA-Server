import { Schema, model } from "mongoose";

const PersonDETAILS = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please provide a first name"],
      unique: false,
    },
    bankDetails: {
      accountNumber: String,
      bankCode: String,
      accountName: String,
    },
    uuid: String,
    lastName: {
      type: String,
      required: [true, "Please provide a last name"],
      unique: false,
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: [true, "Email already exists"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
    },
    reset_code: String,
    phone: String,

    reset_code_expiration: { type: Date },
  },
  { timestamps: true },
);

const Person = model("Person", PersonDETAILS);

export default Person;
