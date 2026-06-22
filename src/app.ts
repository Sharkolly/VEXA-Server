import dotenv from "dotenv";
import express, { Response, Request } from "express";

import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
// import logger from "./helper/logger";

import errorHandler from "./middlewares/errorhandler.middleware";
import auth_route from "./routes/auth.route";
import admin_route from "./routes/admin.route";
import product_route from "./routes/product.route";
import logger from "./config/logger";
import connectToMongoDB from "./config/mongodb.config";
import Payment from "./models/Payment";
// import { initSocket } from "./helpers/socket";

dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:5174' , 'https://client-six-liard-83.vercel.app', 'https://vexa-shop.vercel.app', 'https://vexa-admin.vercel.app', 'admin-phi-eight-59.vercel.app', '*'],
    credentials: true,
  }),
);
app.use(bodyParser.json());
app.use(morgan("dev"));

// middleware
app.use(errorHandler);
app.use("/api/user", auth_route);
app.use("/api/admin", admin_route);
app.use("/api/products", product_route);

app.get("/", (req: Request, res: Response) => {
  res.json("Hello World");
});
app.post("/payment", async (req: Request, res: Response) => {
  const {amount, reference, status} = req.body;
  if(!req.body) console.log('Provide one')

    if(req.body){
      const paymentData = await Payment.create({
        amount,
        reference,
        status
      })
    }

    res.status(200).json({message: status})
});

const PORT = process.env.PORT || 5001;

const start_server = async () => {
  server.listen(PORT, () => {
    // initSocket(server);
    connectToMongoDB();
    logger.info("Server active on Port 5001");
  });
};

start_server();
