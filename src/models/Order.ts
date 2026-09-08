import {model, Schema} from "mongoose";

const orderSchema = new Schema(
  {
    customer: {
      type: Schema.Types.ObjectId,

      ref: "User",

      required: true,
    },

    items: [
      {
        product: {
          type: Schema.Types.ObjectId,

          ref: "Product",
        },

        vendor: {
          type: Schema.Types.ObjectId,

          ref: "Vendor",
        },

        name: String,

        price: Number,

        quantity: Number,
      },
    ],

    total: {
      type: Number,

      required: true,
    },

    paymentReference: {
      type: String,

      unique: true,

      sparse: true,
    },

    paymentStatus: {
      type: String,

      enum: ["pending", "paid", "failed"],

      default: "pending",
    },

    orderStatus: {
      type: String,

      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],

      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);



const Order = model("Order", orderSchema);

export default Order;
