import { Request, Response, NextFunction } from "express";
import { fetchProductByVendorAndDetails } from "../services/admin.service";

export const VendorProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { vendorId } = req.params;
    const { product, vendor } = await fetchProductByVendorAndDetails(vendorId);

    if (!product) {
      return res
        .status(404)
        .json({
          success: false,
          message: "This Vendor hasn't posted any product yet!",
        });


    }


    res.status(201).json({ success: true, data: { product, vendor } });
  } catch (error) {
    next(error);
  }
};
