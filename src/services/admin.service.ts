import Product from "../models/Product";
import type { ProductType } from "../types/product.types";

export const createProduct = async (product: ProductType) => {
  const newProduct = await new Product(product);
  // console.log(product)
  const savedProduct = await newProduct.save();
  return savedProduct;
};

export const fetchProductByVendor = async (vendorId: string) => {
  try {
    const product = await Product.find({ vendor: vendorId }).sort({ createdAt: -1 });

    return product;
  } catch (error) {
    console.error("Error fetching product by vendor:", error);
    throw new Error("Error fetching product by vendor");
  }
};

export const deleteAdminProduct = async (id: string) => {
  const deletedProduct = await Product.findByIdAndDelete(id);
  if (!deletedProduct) {
    throw new Error("Product not found");
  }
  return deletedProduct;
};
