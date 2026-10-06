import {Request, Response, NextFunction} from 'express';
import { sendOrderConfirmation } from '../services/mail.services';

export const sendMail = async (req: Request, res: Response, next:NextFunction) => {
    await sendOrderConfirmation('mofeoluwaadesanya@gmail.com', '12w2efg34jn56qdeqvda7d8d');
}