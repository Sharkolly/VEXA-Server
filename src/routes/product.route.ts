import { Request, Response, Router } from "express";
import { getAllProducts } from "../controllers/allproduct.controller";
import { getProduct } from "../controllers/product_id.controller";

const router = Router();

router.get("/", getAllProducts);

router.get("/product/:id", getProduct);

export default router;