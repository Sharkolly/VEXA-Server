// import { Request, Response, NextFunction } from "express";
// import { fetchProductByVendor } from "../services/admin.service";

// export const getAdminProduct = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   try {
//     // const { productId } = req.params;

//      const { search } = req.query || "";
//   const page = Math.max(Number(req.query.page) || 1, 1);
//   const limit = Math.min(Number(req.query.limit) || 12, 50);

//     const admin = req.admin as { _id: string } | undefined;

//     const vendor = admin?._id;

//     if (!vendor) throw new Error("Please Login to publish your product");

//     const product = await fetchProductByVendor(vendor);

//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     res.status(200).json({ status: true, data: product });
//   } catch (error) {
//     console.error("Error fetching product:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
import { Request, Response, NextFunction } from "express";
import { fetchProductByVendor } from "../services/admin.service";

export const getAdminProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // const { productId } = req.params;

    const { product } = req.query || "";
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(Number(req.query.limit) || 4, 50);

    const admin = req.admin as { _id: string } | undefined;

    const vendor = admin?._id;

    if (!vendor) throw new Error("Please Login to view your product(s)");

    console.log(product);

    const { products, totalPages, totalProducts } = await fetchProductByVendor(
      vendor,
      product as string,
      page,
      limit,
    );
    if (!products) {
      return res
        .status(404)
        .json({ message: "No Product yet, please upload your product" });
    }

    return res.status(200).json({
      status: "success",
      data: products,
      currentPage: page,
      totalPages,
      totalProducts,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    });

    // res.status(200).json({ status: true, data: product });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
