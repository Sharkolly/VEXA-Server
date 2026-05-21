import logger from "../config/logger";
import { Request, Response, NextFunction,  } from "express";

const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error("🔥Error:", error?.message);
  logger.error("🔥Error:", error);


  if (!res.headersSent) {
    const statusCode = (error as any)?.statusCode || 500;
    res.status(statusCode).json({
      success: false,
      message: error?.message || "Internal Server Error",
    });
  }
};

export default errorHandler;
 
