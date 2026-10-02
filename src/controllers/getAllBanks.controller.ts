import axios from 'axios';
import {Request, Response, NextFunction } from 'express';

export const AllBanks = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const {data} = await axios.get('https://api.paystack.co/bank?country=nigeria');
        res.status(201).json({status: true, data});
    }

    catch(err) {
        next(err);
    }


}