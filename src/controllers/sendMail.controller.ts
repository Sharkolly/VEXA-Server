import {Request, Response, NextFunction} from 'express';
import { sendOrderConfirmation } from '../services/mail.services';

export const sendMail = async (req: Request, res: Response, next:NextFunction) => {
  try {
      await sendOrderConfirmation('sharkollymofeoluwa@gmail.com', '12w2efg34jn56qdeqvda7d8d');
      res.status(201).json({message: 'Sent successfully', status: true});
  }

  catch(err) {
    next(err);
  }
}