import {Request, Response, NextFunction} from 'express';
import {getRemainingSubCategories} from '../services/admin.service';


export const getAvailableSubCategories = async (req: Request, res: Response, next: NextFunction) => {
  try {
   
    const availableCategories = await getRemainingSubCategories();
    res.status(200).json(availableCategories);
  } catch (error) {
next(error);
  }
};