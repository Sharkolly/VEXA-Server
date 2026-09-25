import { Request, Response, NextFunction } from "express";
import { getCategory, searchCategory } from "../services/product.services";

export const Category = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { search } = req.query || "";
  try {
    // const subCategories = await getCategory();
    const searchedProducts = await searchCategory(search as string);
       return res.status(200).json({ status: "success", data: searchedProducts,  });
  } catch (err) {
    next(err);
  }
};
