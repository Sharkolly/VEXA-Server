import { Request, Response, NextFunction } from "express";
import {
  getAllProductsFromDB,
  getCategory,
  searchProduct,
} from "../services/product.services";

export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { search } = req.query || "";
  try {
    const categories = await getCategory();
    if (search) {
      const { product } = await searchProduct(search as string);
      return res
        .status(200)
        .json({ status: "success", data: product, categories });
    }
    const allProducts = await getAllProductsFromDB();
    res.status(200).json({ status: "success", data: allProducts, categories });
  } catch (error) {
    next(error);
  }
};
