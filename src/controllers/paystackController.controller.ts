// import crypto from "crypto";
// import Order from "../models/Order";
// import {Request, Response, NextFunction} from 'express';

// export const paystackWebhook = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     // 1. Verify that the request came from Paystack

//     if(process.env.PAYSTACK_SECRET_KEY) throw new Error('No Paystack Key Found');

//     const hash = crypto
//       .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY)
//       .update(req.rawBody)
//       .digest("hex");

//     const signature = req.headers["x-paystack-signature"];

//     if (
//       !signature ||
//       !/^[0-9a-f]{128}$/i.test(signature) ||
//       !crypto.timingSafeEqual(
//         Buffer.from(hash, "hex"),
//         Buffer.from(signature, "hex")
//       )
//     ) {
//       return res.sendStatus(401);
//     }

//     // 2. Get the event
//     const event = req.body;

//     // 3. Handle successful payment
//     if (event.event === "charge.success") {
//       const payment = event.data;

//       const order = await Order.findOne({
//         paymentReference: payment.reference,
//       });

//       if (!order) {
//         console.log("Order not found:", payment.reference);
//         return res.sendStatus(200);
//       }

//       // 4. Check the payment details
//       if (
//         payment.status !== "success" ||
//         payment.amount !== order.totalAmount * 100 ||
//         payment.currency !== "NGN"
//       ) {
//         return res.sendStatus(200);
//       }

//       // 5. Prevent duplicate processing
//       if (order.paymentStatus === "paid") {
//         return res.sendStatus(200);
//       }

//       // 6. Update order
//       order.paymentStatus = "paid";
//       order.orderStatus = "processing";

//       await order.save();
//     }

//     return res.sendStatus(200);
//   } catch (error) {
//     console.error("Paystack webhook error:", error);
//     return res.sendStatus(500);
//   }
// };