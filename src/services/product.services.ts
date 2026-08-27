import Product from "../models/Product";

export const getProductsFromDB = async () => {
  const categories = [
  "electronics",
  "fashion",
  "beauty-health",
  "home-kitchen",
  "automobile",
  "sports-outdoors",
  "books-education",
  "baby-products",
  "groceries",
  "pet-supplies",
  "industrial-tools",
  "office-supplies",
  "gaming",
  "musical-instruments",
  "arts-crafts"
]
  const data = await Promise.all(
  categories.map(async (category) => {
    const products = await Product.aggregate([
      { $match: { category } },
      { $sample: { size: 10} },
    ]);

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
 // const product = await Product.find().limit(15);
  const product = await Product.aggregate([
    {
      $sample: {
        size: 15,
      },
    },
    {
      $project: {
        name: 1,
        price: 1,
        description: 1,        
        category: 1,
        subCategory: 1,
        brand: 1,
        discount: 1,
        createdAt: 1,
        images: 1,
        slug: 1
      },
    },
  ]);
  return product;
};

export const getProductSlug = async (slug: string, category: string, subCategory: string) => {
  const product = await Product.findOne({slug, category, subCategory});
  // console.log(product);
  return product;
};

export const searchProduct = async (search: string) => {
  const product = await Product.find({
    name: { $options: "i", $regex: search },
  }).limit(15);

  return { product };
};

export const searchCategory = async (category: string) => {
  let product;
  if (category == "All") {
    //product = await Product.find().limit(15);
    product = await Product.aggregate([
    {
      $sample: {
        size: 15,
      },
    },
    {
      $project: {
        name: 1,
        price: 1,
        description: 1,        
        category: 1,
        subCategory: 1,
        brand: 1,
        discount: 1,
        createdAt: 1,
        images: 1,
        slug: 1
      },
    },
  ]);
  } else {
   // product = await Product.find({ category }).limit(15);

    product = await Product.aggregate([
  { $match: { category } },
  { $sample: { size: 15 } },
  {
    $project: {
      name: 1,
      price: 1,
      description: 1,
      images: 1,
      subCategory: 1,
      slug: 1,
      category: 1,
      brand: 1,
      discount: 1,
      createdAt: 1,
    },
  },
]);
  }
  return product;
};

export const relatedCategory = async (category: string) => {
  // const product = await Product.find({ category }).limit(4);

  const product = await Product.aggregate([
  { $match: { category } },
  { $sample: { size: 4 } },
  {
    $project: {
      name: 1,
      price: 1,
      description: 1,
      images: 1,
      subCategory: 1,
      slug: 1,
      category: 1,
      brand: 1,
      discount: 1,
      createdAt: 1,
    },
  },
]);
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
        name: 1,
        price: 1,
        description: 1,        
        category: 1,
        subCategory: 1,
        brand: 1,
        discount: 1,
        createdAt: 1,
        images: 1,
        slug: 1
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
