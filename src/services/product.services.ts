import Product from "../models/Product";

export const getProductsFromDB = async () => {
  //   const categories = [
  //   "electronics",
  //   "fashion",
  //   "beauty-health",
  //   "home-kitchen",
  //   "automobile",
  //   "sports-outdoors",
  //   "books-education",
  //   "baby-products",
  //   "groceries",
  //   "pet-supplies",
  //   "industrial-tools",
  //   "office-supplies",
  //   "gaming",
  //   "musical-instruments",
  //   "arts-crafts"
  // ]

  const allSubCategories = [
    "phones",
    "laptops",
    "tablets",
    "desktop-computers",
    "monitors",
    "printers",
    "cameras",
    "televisions",
    "headphones",
    "speakers",
    "smart-watches",
    "accessories",
    "mens-clothing",
    "womens-clothing",
    "kids-clothing",
    "shoes",
    "bags",
    "watches",
    "jewelry",
    "sunglasses",
    "sportswear",
    "traditional-wear",
    "skincare",
    "haircare",
    "makeup",
    "perfumes",
    "personal-care",
    "health-supplements",
    "oral-care",
    "furniture",
    "kitchen-appliances",
    "cookware",
    "home-decor",
    "bedding",
    "lighting",
    "storage",
    "cleaning-supplies",
    "cars",
    "motorcycles",
    "car-parts",
    "tyres",
    "car-electronics",
    "car-care",
    "accessories",
    "fitness-equipment",
    "football",
    "basketball",
    "cycling",
    "camping",
    "swimming",
    "outdoor-gear",
    "academic-books",
    "novels",
    "children-books",
    "e-books",
    "stationery",
    "baby-clothing",
    "diapers",
    "baby-food",
    "baby-toys",
    "baby-gear",
    "food-items",
    "beverages",
    "snacks",
    "cooking-ingredients",
    "frozen-foods",
    "dog-supplies",
    "cat-supplies",
    "pet-food",
    "pet-toys",
    "pet-grooming",
    "power-tools",
    "hand-tools",
    "safety-equipment",
    "generators",
    "electrical-supplies",
    "office-furniture",
    "stationery",
    "printers",
    "office-electronics",
    "playstation",
    "xbox",
    "nintendo",
    "video-games",
    "gaming-accessories",
    "guitars",
    "keyboards",
    "drums",
    "microphones",
    "studio-equipment",
    "painting",
    "drawing",
    "craft-materials",
    "diy-kits",
  ];
  const shuffledCategories = [...allSubCategories].sort(
    () => Math.random() - 0.5,
  );

  for (let i = shuffledCategories.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledCategories[i], shuffledCategories[j]] = [
      shuffledCategories[j],
      shuffledCategories[i],
    ];
  }

  const data = await Promise.all(
    shuffledCategories.map(async (subCategory) => {
      const products = await Product.aggregate([
        { $match: { subCategory } },
        { $sample: { size: 10 } },
      ]);
      return {
        subCategory,
        products,
      };
    }),
  );

  return data;

};

export const getCategory = async () => {
  const subCategories = await Product.distinct("subCategory");
  return subCategories;
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
        slug: 1,
      },
    },
  ]);
  return product;
};

export const getProductSlug = async (
  slug: string,
  category: string,
  subCategory: string,
  id: string,
) => {
  const product = await Product.findOne({
    slug,
    category,
    subCategory,
    _id: id,
  });
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

  console.log(category)
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
          slug: 1,
        },
      },
    ]);
  } else {
    // product = await Product.find({ category }).limit(15);

    product = await Product.aggregate([
      { $match: { subCategory: category } },
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
        slug: 1,
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
