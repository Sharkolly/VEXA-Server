import { Schema, model } from "mongoose";

const PAYMENT = new Schema(
  {
    amount: { type: String },
    reference: { type: String },
    status: { type: String },
  },
  { timestamps: true },
);

const Payment = model("Payment", PAYMENT);

export default Payment;
