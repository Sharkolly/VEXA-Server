import { Router } from "express";
import { getAllProducts } from "../controllers/allproduct.controller";
import { getAllPro } from "../controllers/allProducts.controller";
import { getHomeProduct } from "../controllers/HomeProduct.controller";
import { getProduct } from "../controllers/product_id.controller";
import { Category } from "../controllers/getCategory";
import { RelatedCategory } from "../controllers/getRelatedCategory";

const router = Router();

router.get("/", getAllProducts);

router.get("/min", getHomeProduct);

router.get("/all", getAllPro);

router.get("/category", Category);

// router.get("/category/:category", RelatedCategory);
router.get("/category/electronics", RelatedCategory);

router.get("/product/:id", getProduct);

export default router;
