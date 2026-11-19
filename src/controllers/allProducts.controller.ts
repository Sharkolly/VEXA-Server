import {Request, Response, NextFunction } from 'express';
import {getProductsFromDB} from '../services/product.services'


export const getAllPro = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const all_products = await getProductsFromDB();
        return res.status(201).json({status: 'success', data: all_products});
    }

    catch(error) {
        next(error);
    }
}