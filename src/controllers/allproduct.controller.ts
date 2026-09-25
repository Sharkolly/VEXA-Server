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
    const subCategories = await getCategory();
    console.log(search)
    if (search) {
      const { product } = await searchProduct(search as string);
      return res
        .status(200)
        .json({ status: "success", data: product, subCategories });
    }
    const allProducts = await getAllProductsFromDB();    
    res.status(200).json({ status: "success", data: allProducts, subCategories });
  } catch (error) {
    next(error);
  }
};
