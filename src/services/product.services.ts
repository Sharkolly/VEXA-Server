import Product from "../models/Product";

export const getAllProductsFromDB = async () => {
  const product = await Product.find();
  return product;
};

export const getProductID = async (id: string) => {
  const product = await Product.findById(id);
  return product;
};

export const searchProduct = async (search: string) => {
  const product = await Product.find({
    title: { $options: "i", $regex: search },
  });

  return product;
};

export const searchCategory = async (category: string) => {
  let product;
  if (category == "All") {
    product = await Product.find();
  } else {
    product = await Product.find({ category });
  }
  return product;
};
