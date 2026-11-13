import axios from 'axios';
import {Request, Response, NextFunction} from  'express';


export const GetUserBankName = async (req: Request, res: Response, next: NextFunction) => {
    const {accountNumber, bankCode} = req.body;
  try {
    const resp = await axios.get(
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

if(!resp.data) res.status(401).json({message: "Bank details not found", status: false})

res.status(201).json({status: true, data: resp.data});
  }

  catch(err: any) {
    let statusCode = err.response?.status || 500;


  res.status(statusCode).json({
    success: false,
    message: err.response.data.message ,
  });
    // next(err)
  }
}