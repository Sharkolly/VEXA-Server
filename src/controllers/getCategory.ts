import { Request, Response, NextFunction } from "express";
import { getCategory, searchCategory } from "../services/product.services";

export const Category = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { search } = req.query || "";
  const page = Math.max(Number(req.query.page) || 1, 1);
  const limit = Math.min(Number(req.query.limit) || 12, 50);

  const skip = (page - 1) * limit;
  try {
    // const subCategories = await getCategory();    
    const {products, totalPages, totalProducts} = await searchCategory(search as string, page, limit );
    return res
      .status(200)
      .json({
        status: "success",
        data: products,
        currentPage: page,
        totalPages,
        totalProducts,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      });
  } catch (err) {
    next(err);
  }
};
