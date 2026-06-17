import { Request, Response, NextFunction } from "express";
const getAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(201).json({ message: req.admin });
  } catch (err) {
    next(err);
  }
};

export default getAdmin;
