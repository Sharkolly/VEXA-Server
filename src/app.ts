import dotenv from "dotenv";
import express, { Response, Request } from "express";

import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
// import logger from "./helper/logger";

import errorHandler from "./middlewares/errorhandler.middleware";
import auth_route from "./routes/auth.route";
import product_route from "./routes/product.route";
import logger from "./config/logger";
import connectToMongoDB from "./config/mongodb.config";
// import { initSocket } from "./helpers/socket";

dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true,
  }),
);
app.use(bodyParser.json());
app.use(morgan("dev"));

// middleware
app.use(errorHandler);
app.use("/api/user", auth_route);
app.use("/api/products", product_route);

app.get("/", (req: Request, res: Response) => {
  res.json("Hello World");
});

const start_server = async () => {
  server.listen(3001, () => {
    // initSocket(server);
    connectToMongoDB();
    logger.info("Server active on Port 5001");
  });
};

start_server();
