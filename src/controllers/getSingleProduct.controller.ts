import { Response, Request, NextFunction } from "express";
import { getVendorSingleProduct } from "../services/admin.service";

export const getSingleProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const admin = req.admin as { _id: string } | undefined;

  const { vendorId, productId } = req.params;

  const vendor = admin?._id;

  if (!vendor) throw new Error("Please Login to publish your product");

  if (vendor != vendorId) {
    res
      .status(403)
      .json({ status: false, message: "This is not your product" });
  }

  try {
    const product = await getVendorSingleProduct(vendorId, productId);

    if (!product)
      res
        .status(201)
        .json({
          status: true,
          message: "This product does not exist or it has been deleted",
        });
    return res.status(200).json({ status: "true", data: product });
  } catch (err) {
    next(err);
  }
};
