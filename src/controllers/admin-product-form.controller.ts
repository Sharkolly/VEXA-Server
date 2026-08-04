import { NextFunction, Request, Response } from "express";
import { createProduct } from "../services/admin.service";
import slugify from "slugify";

export const ProductForm = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      name,
      price,
      category,
      subCategory,
      tags,
      description,
      images,
      video,
      brand,
      discount,
      color,
      deviceSpecifications,
      condition,
      size,
    } = req.body;

    const admin = req.admin as { _id: string } | undefined;

    const vendor = admin?._id;

    // console.log(req.body)

    if (!vendor) throw new Error("Please Login to publish your product");

    const deviceSpec = JSON.parse(req.body.deviceSpecifications || "{}");
    const slug = slugify(req.body.name, {
      lower: true,
      strict: true,
    });

    const product = {
      name,
      price,
      category: category.toLowerCase(),
      subCategory,
      tags,
      description,
      images,
      video,
      brand,
      discount,
      color,
      condition,
      size,
      deviceSpecifications: deviceSpec,
      slug,
      vendor,
    };
    const createdProduct = await createProduct(product);

    return res.status(201).json({
      success: true,
      message: "Product created successfully!",
      data: createdProduct,
    });
  } catch (error: any) {
    console.log(error.message);

    // return res.status(500).json({ success: false, message: error.message });
    next(error);
  }
};
