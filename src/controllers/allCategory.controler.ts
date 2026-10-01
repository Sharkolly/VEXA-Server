import { Request, Response, NextFunction } from "express";
import { getCategory } from "../services/product.services";

export const AllCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const allCategory = await getCategory();

    res.status(200).json({status: true, data: ['all', ...allCategory] });
  } catch (err) {
    next(err);
  }
};
