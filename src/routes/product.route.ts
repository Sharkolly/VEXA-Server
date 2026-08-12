import { Router } from "express";
import { token_verify } from "../middlewares/token_verify.middleware";
import { getAllProducts } from "../controllers/allproduct.controller";
import { getAllPro } from "../controllers/allProducts.controller";
import { getHomeProduct } from "../controllers/HomeProduct.controller";
import { getProduct } from "../controllers/product_id.controller";
import { Category } from "../controllers/getCategory";
import { RelatedCategory } from "../controllers/getRelatedCategory";
import getDeliveryLocationDistance from '../controllers/locationDistance.controller'   

const router = Router();

router.get("/", getAllProducts);

router.get("/min", getHomeProduct); 

router.get("/all", getAllPro);

router.get("/category", Category);

// router.get("/category/:category", RelatedCategory);
router.get("/category/:category", RelatedCategory);

router.get("/:category/:subCategory/:slug", getProduct);


router.post('/get-distance',token_verify,   getDeliveryLocationDistance)



export default router;
