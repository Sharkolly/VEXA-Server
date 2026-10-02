import axios from 'axios';
import {Request, Response, NextFunction} from  'express';


export const GetUserBankName = async (req: Request, res: Response, next: NextFunction) => {
    const {accountNumber, bankCode} = req.body;
  try {
    const {data} = await axios.get(
  "https://api.paystack.co/bank/resolve",
  {
    params: {
      account_number: accountNumber,
      bank_code: bankCode
    },
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
    }
  }
);

res.status(201).json({status: true, data});
  }

  catch(err) {
    next(err)
  }
}