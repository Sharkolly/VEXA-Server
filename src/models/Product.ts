import { Schema, model } from "mongoose";

const PRODUCT = new Schema(
  {
    id: {
      type: String,
      unique: false,
    },

    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    sku: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Product = model("Product", PRODUCT);

export default Product;
