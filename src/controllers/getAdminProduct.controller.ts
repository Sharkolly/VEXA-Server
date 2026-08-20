import { Request, Response, NextFunction } from "express";
import { fetchProductByVendor } from "../services/admin.service";

export const getAdminProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // const { productId } = req.params;
    const admin = req.admin as { _id: string } | undefined;

    const vendor = admin?._id;

    if (!vendor) throw new Error("Please Login to publish your product");

    const product = await fetchProductByVendor(vendor);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ status: true, data: product });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
