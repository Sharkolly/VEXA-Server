import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      admin?: JwtPayload | { _id: string };
    }
  }
}

export const admin_token_verify = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req?.headers?.authorization;

  if (!token) return res.status(401).json({ message: "No Token Found" });

  jwt.verify(
    token,
    process.env.JWT_SECRET_KEY as string,
    (err: any, decoded: any) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(401).json({ message: "Token has expired" });
        }
        if (err.name === "JsonWebTokenError") {
          return res.status(401).json({ message: "Invalid token" });
        } else {
          return res.status(500).json({ message: "Token verification failed" });
        }
      }
      req.admin = decoded;
      next();
    },
  );
};
