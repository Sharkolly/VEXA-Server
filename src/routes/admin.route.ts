import { Request, Response, Router } from "express";
import { AdminSignup } from "../controllers/admin.signup.controller";
import { AdminLogin } from "../controllers/admin.login.controller";
import getAdmin from "../controllers/admin-verify-token.controller";
import { admin_token_verify } from "../middlewares/admin-token_verify.middleware";
import admin from "../controllers/admin.controller";

const router = Router();

router.post("/login", AdminLogin);
router.post("/signup", AdminSignup);
router.get("/token-verify", admin_token_verify, getAdmin);
router.get("/", admin_token_verify, admin);

export default router;
