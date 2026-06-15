import { Request, Response, NextFunction } from "express";
import { searchCategory } from "../services/product.services";

export const Category = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { search } = req.query || "";
  // console.log(search)

  try {
    const searchedProducts = await searchCategory(search as string);
    console.log(searchedProducts)
       return res.status(200).json({ status: "success", data: searchedProducts });
  } catch (err) {
    next(err);
  }
};
