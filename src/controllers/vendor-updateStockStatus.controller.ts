import { Request, Response, NextFunction} from 'express';

export const updateStockStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
         const admin = req.admin as { _id: string } | undefined;
        
         const {id} = req.params 

         const { stock } = req.body

          const vendor = admin?._id;
        
          if (!vendor) throw new Error("Please Login to update your product stock status");


          res.status(201).json({status: true, message: 'Stock Status Updated Successfully'})
          
    }

    catch (err) {
        next(err);
    }
}