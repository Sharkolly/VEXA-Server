import Order from "../models/Order";
import {Request, Response, NextFunction} from 'express';
import crypto from 'crypto';

export  const paystackWebhook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    // --------------------------------------------------
    // VERIFY PAYSTACK WEBHOOK
    // --------------------------------------------------


    if( !process.env.PAYSTACK_SECRET_KEY) {
      console.log('PAYSTACK_SECRET_KEY is not set in environment variables');
      return res.sendStatus(500);
    }

    const hash =
      crypto
        .createHmac(
          "sha512",
          process.env.PAYSTACK_SECRET_KEY
        )
        .update(req.body)
        .digest("hex");


    if (
      hash !==
      req.headers["x-paystack-signature"]
    ) {

      return res.sendStatus(401);

    }


    const event =
      JSON.parse(req.body);


    // --------------------------------------------------
    // PAYMENT SUCCESS
    // --------------------------------------------------

    if (
      event.event ===
      "charge.success"
    ) {

      const reference =
        event.data.reference;


      const order =
        await Order.findOne({

          paymentReference:
            reference

        });


      if (!order) {

        return res.sendStatus(200);

      }


      // Prevent duplicate processing
      if (
        order.paymentStatus ===
        "paid"
      ) {

        return res.sendStatus(200);

      }


      // ------------------------------------------------
      // MARK ORDER AS PAID
      // ------------------------------------------------

      order.paymentStatus =
        "paid";


      order.orderStatus =
        "processing";


      await order.save();


      console.log(
        `FEXA ORDER ${order._id} PAID`
      );

    }


    return res.sendStatus(200);


  } catch (error) {

    console.log(error);

    return res.sendStatus(500);

  }

};