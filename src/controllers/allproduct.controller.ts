import { Request, Response, NextFunction } from "express";
import {
  getAllProductsFromDB,
  getCategory,
  searchProduct,
  // totalProduct,
} from "../services/product.services";

export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { search } = req.query || "";
   const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(Number(req.query.limit) || 12, 50);

  try {
    const subCategories = await getCategory();
    if (search) {
      const { products, totalPages, totalProducts } = await searchProduct(
        search as string,
        page,
        limit
      );
      return res
        .status(200)
        .json({
          status: "success",
          data: products,
          subCategories,
          currentPage: page,
          totalPages,
          totalProducts,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1,
        });
    }
    const allProducts = await getAllProductsFromDB();

    res.status(200).json({
      status: "success",
      data: allProducts,
      subCategories,
    });
  } catch (error) {
    next(error);
  }
};
