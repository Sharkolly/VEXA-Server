import { Request, Response, Router } from "express";
import { signup} from "../controllers/signup.controller";
import { token_verify } from "../middlewares/token_verify.middleware";
import { login } from "../controllers/login.controller";
import getUser from "../controllers/verify-token.controller";

 const router = Router();

router.get("/", async (req: Request, res: Response) => {
  return res.status(200).json("Hello Tue Tue ");
});
router.post("/login", login);
router.post("/signup", signup);
router.get("/token-verify", token_verify, getUser);

// veerify token


export default router