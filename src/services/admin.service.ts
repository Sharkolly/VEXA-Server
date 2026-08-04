import Product from "../models/Product";
import type { ProductType } from "../types/product.types";

export const createProduct = async (product: ProductType) => {
  const newProduct = await new Product( product);
  // console.log(product)
  const savedProduct = await newProduct.save();
  return savedProduct;
};
 