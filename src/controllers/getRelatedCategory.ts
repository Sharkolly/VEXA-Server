import { Request, Response, NextFunction } from "express";
import { relatedCategory } from "../services/product.services";

export const RelatedCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { category } = req.params;

  try {
    const searchedProducts = await relatedCategory(category as string);
    return res.status(200).json({ status: "success", data: searchedProducts });
  } catch (err) {
    next(err);
  }
};
