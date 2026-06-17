import {Request, Response, NextFunction} from 'express';
import {get_admin_details} from '../services/auth.services'

const admin = async (req:Request, res:Response, next:NextFunction) => {
    const {admin} = req;    

    try {
        const ADMINDETAILS = await get_admin_details(admin?._id);
        if(!ADMINDETAILS) return res.status(404).json({status: false, message: 'No User found'});

        return res.status(200).json({status: true, message: ADMINDETAILS});
}

    catch(error) {
        next(error);
    }
}

export default admin;