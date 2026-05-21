import { Request, Response, NextFunction } from "express";
import { getProductID } from "../services/product.services";

export const getProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    console.log(id);

    const product = await getProductID(id);
    return res.status(200).json({ status: "success", data: product });
  } catch (error) {
    next(error);
  }
};
