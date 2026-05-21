import { Request, Response, Router } from "express";
import { signup} from "../controllers/signup.controller";
import { token_verify } from "../middlewares/token_verify.middleware";
import { login } from "../controllers/login.controller";
import getUser from "../controllers/verify-token.controller";
import user from "../controllers/user.controller";

 const router = Router();

router.post("/login", login);
router.post("/signup", signup);
router.get("/token-verify", token_verify, getUser);
router.get('/', token_verify, user);


export default router