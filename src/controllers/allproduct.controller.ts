import { Request, Response, NextFunction } from "express";
import {
  getAllProductsFromDB,
  searchProduct,
} from "../services/product.services";

export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { search } = req.query || "";  
  try {
    if (search) {
      const searchedProducts = await searchProduct(search as string);
      return res
        .status(200)
        .json({ status: "success", data: searchedProducts });
    }
    const allProducts = await getAllProductsFromDB();
    res.status(200).json({ status: "success", data: allProducts });
  } catch (error) {
    next(error);
  }
};
