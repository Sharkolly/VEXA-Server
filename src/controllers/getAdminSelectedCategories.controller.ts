import {Request, Response, NextFunction} from 'express';
import { fetchSelectedCategories } from '../services/admin.service';


export const AdminSelectedCategory = async (req: Request, res: Response, next: NextFunction) => {
        const admin = req.admin as { _id: string } | undefined;
    
        const vendor = admin?._id;
    
        if (!vendor) throw new Error("Please Login to view your category and sub-catgeories");

        try {
            const selectedCategories = await fetchSelectedCategories(vendor);
            res.status(200).json({
                status: "success",
                data: selectedCategories,
            });
        }

        catch(err) {
            next(err);
        }
}