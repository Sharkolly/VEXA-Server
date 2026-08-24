import { Request, Response, NextFunction } from "express";
import { deleteAdminProduct } from "../services/admin.service";

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { productId } = req.params;

  try {
    const deletedProduct = await deleteAdminProduct(productId);
    console.log(deletedProduct);
    res
      .status(200)
      .json({
        message: "Product deleted successfully",
        product: deletedProduct,
      });
  } catch (err) {
    next(err);
  }
};
