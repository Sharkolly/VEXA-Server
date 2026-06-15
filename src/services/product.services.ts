import Product from "../models/Product";

export const getProductsFromDB = async () => {
  const categories = [
    "Electronics",
    "Fashion",
    "Phones",
    "Computers",
    "Beauty",
    "Gaming",
    "Home & Kitchen",
  ];

  const data = await Promise.all(
    categories.map(async (category) => {
      const products = await Product.find({ category }).limit(8);

      return {
        category,
        products,
      };
    }),
  );

  return data;
};

export const getCategory = async () => {
  const categories = await Product.distinct("category");
  return categories;
};

export const getAllProductsFromDB = async () => {
  const product = await Product.find().limit(15);
  return product;
};

export const getProductID = async (id: string) => {
  const product = await Product.findById(id);
  return product;
};

export const searchProduct = async (search: string) => {
  const product = await Product.find({
    title: { $options: "i", $regex: search },
  }).limit(15);

  return { product };
};

export const searchCategory = async (category: string) => {
  let product;
  if (category == "All") {
    product = await Product.find().limit(15);
  } else {
    product = await Product.find({ category }).limit(15);
  }
  return product;
};

export const GetHomeProduct = async () => {
  const product = await Product.aggregate([
    {
      $sample: {
        size: 4,
      },
    },
    {
      $project: {
        title: 1,
        price: 1,
        description: 1,
        image: 1,
        category: 1,
        brand: 1,
        discount: 1,
        createdAt: 1,
      },
    },
  ]);

  // const categories = await Product.distinct("category");

  // const shuffled = categories.sort(() => Math.random() - 0.5);

  // const randomCategories = shuffled.slice(0, 4);

  // const product = await Product.find({
  //   category: { $in: randomCategories },
  // });

  return product;
};
