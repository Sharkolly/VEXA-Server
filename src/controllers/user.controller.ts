import {Request, Response, NextFunction} from 'express';
import {get_user_details} from '../services/auth.services'

const user = async (req:Request, res:Response, next:NextFunction) => {
    const {user} = req;    

    try {
        const USERDETAILS = await get_user_details(user?._id);
        if(!USERDETAILS) return res.status(404).json({status: false, message: 'No User found'});

        return res.status(200).json({status: true, message: USERDETAILS});
}

    catch(error) {
        next(error);
    }
}

export default user;