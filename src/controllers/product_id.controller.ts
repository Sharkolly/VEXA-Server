import { Request, Response, NextFunction } from "express";
import { getProductSlug } from "../services/product.services";

export const getProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { slug, category, subCategory } = req.params;
    const product = await getProductSlug(slug, category, subCategory);
    console.log('product', product)
    return res.status(200).json({ status: "success", data: product });
  } catch (error) {
    next(error);
  }
};
