import { Response, Request, NextFunction } from "express";
import { GetHomeProduct } from "../services/product.services";

export const getHomeProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const homeProduct = await GetHomeProduct();
    return res.status(201).json({ status: "success", data: homeProduct });
  } catch (err) {
    next(err);
  }
};
