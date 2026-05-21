import { Request, Response, NextFunction } from "express";
const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {    
    res.status(201).json({ message: req.user });
  } catch (err) {
    next(err);
  }
};

export default getUser;
