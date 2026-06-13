import Product from "../models/Product";

export const getProductsFromDB = async () => {
  
    const categories = [
      "Electronics",
      "Fashion",
      "Phones",
      "Computers",
      "Beauty",
      'Gaming',
      'Home & Kitchen',
    ];

    const data = await Promise.all(
      categories.map(async (category) => {
        const products = await Product.find({ category })
          .limit(8);

        return {
          category,
          products,
        };
      })
    );
  
  return data;
};

export const getCategory = async () => {
  const categories = await Product.distinct('category');
  return categories;

}

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

  return { product };
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
