import Product from "../models/Product";
import Admin from "../models/Admin";
import type { ProductType } from "../types/product.types";
import Category from "../models/Category";

export const createProduct = async (product: ProductType) => {
  const newProduct = await new Product(product);
  const savedProduct = await newProduct.save();
  return;
};

export const fetchProductByVendor = async (
  vendorId: string,
  product: string,
  page: number = 1,
  limit: number = 4,
) => {
  try {
    const currentPage = Math.max(1, Number(page) || 1);
    const pageLimit = Math.max(1, Number(limit) || 4);

    const skip = (currentPage - 1) * pageLimit;

    // Use ONE filter for both queries
    const filter: any = {
      vendor: vendorId,
    };

    if (product?.trim()) {
      filter.name = {
        $regex: product.trim(),
        $options: "i",
      };
    }

    const [products, totalProducts] = await Promise.all([
      Product.find(filter)
        .select(
          "name price description category subCategory condition brand discount createdAt images slug stock",
        )
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(pageLimit),

      Product.countDocuments(filter),
    ]);

    return {
      products,
      currentPage,
      totalPages: Math.ceil(totalProducts / pageLimit),
      totalProducts,
    };
  } catch (error) {
    console.error("Error fetching product by vendor:", error);
    throw new Error("Error fetching product by vendor");
  }
};

export const fetchProductByVendorAndDetails = async (
  vendorId: string,
  businessName: string,
) => {
  try {
    const vendor = await Admin.findOne({ _id: vendorId, businessName }).select(
      "accountName email phoneNumber profileImage businessName category createdAt businessDescription",
    );

    const product = await Product.find({ vendor: vendorId });
    return { vendor, product };
  } catch (error) {
    console.error("Error fetching product by vendor:", error);
    throw new Error("Error fetching product by vendor");
  }
};

export const deleteAdminProduct = async (id: string) => {
  const deletedProduct = await Product.findByIdAndDelete(id);
  if (!deletedProduct) {
    throw new Error("Product not found");
  }
  return deletedProduct;
};

export const getVendorSingleProduct = async (
  vendorId: string,
  productId: string,
) => {
  const getProduct = await Product.findOne({
    vendor: vendorId,
    _id: productId,
  });
  return getProduct;
};

export const getRemainingSubCategories = async () => {
  const categories = await Category.find();

  const availableCategories = categories.map((category) => ({
    _id: category._id,
    name: category.name,
    slug: category.slug,

    subCategories: category.subCategories.filter(
      (subCategory) => subCategory.vendor === null,
    ),
  }));

  return availableCategories;
};

export const updateStock = async (
  id: string = "",
  stock: string = "out_of_stock",
) => {
  const stockChange = await Product.findOneAndUpdate(
    { _id: id },
    {
      $set: { stock },
    },
  );
  return;
};

export const fetchSelectedCategories = async (vendor: string) => {
  const vendorCategoriesAndSubCategories = await Admin.findById(vendor).select("categories subCategories");

  return  vendorCategoriesAndSubCategories;
};
