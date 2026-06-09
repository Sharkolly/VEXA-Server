import { Request, Response, Router } from "express";
import { getAllProducts } from "../controllers/allproduct.controller";
import { getAllPro } from "../controllers/allProducts.controller";
import { getProduct } from "../controllers/product_id.controller";
import { Category } from "../controllers/getCategory";

const router = Router();

router.get("/", getAllProducts);

router.get("/all", getAllPro);

router.get("/category", Category);

router.get("/product/:id", getProduct);

export default router;