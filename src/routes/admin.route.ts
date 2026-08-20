import { Request, Response, Router } from "express";
import { AdminSignup } from "../controllers/admin.signup.controller";
import { AdminLogin } from "../controllers/admin.login.controller";
import getAdmin from "../controllers/admin-verify-token.controller";
import { admin_token_verify } from "../middlewares/admin-token_verify.middleware";
import admin from "../controllers/admin.controller";
// importprocessMediaUpload,  { productMediaFields } from "../config/CloudinaryStorage.config";
// import { AddProduct } from "../controllers/PostProduct";
import { processMediaUpload } from "../config/CloudinaryStorage.config";
import { ProductForm } from "../controllers/admin-product-form.controller";
import { getAdminProduct } from "../controllers/getAdminProduct.controller";

const router = Router();

router.post("/login", AdminLogin);
router.post("/signup", AdminSignup);
router.get("/token-verify", admin_token_verify, getAdmin);
router.get("/", admin_token_verify, admin);

// router.post("/product", productMediaFields, AddProduct);
router.get("/product", admin_token_verify, getAdminProduct);

router.post("/product", admin_token_verify, processMediaUpload, ProductForm);

export default router;
