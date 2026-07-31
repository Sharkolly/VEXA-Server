import Product from "../models/Product";
import type { ProductType } from "../types/product.types";

export const createProduct = async (product: ProductType, vendor: string | undefined) => {
  const newProduct = await new Product({ product, vendor });
  const savedProduct = await newProduct.save();
  return savedProduct;
};
 