import { Request, Response, NextFunction } from "express";
import Product from "../models/Product";
import axios from "axios";
import Order from "../models/Order";
import Admin from "../models/Admin";

const initializePayment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { user } = req;
  try {
    const { details} = req.body;

    const cart = details.CartedProduct;
    const userDetails = details.deliveryDetails;

    if (!cart || cart.length === 0) {
      return res.status(400).json({
        message: "Cart is empty",
      });
    }

    
    const productIds = cart.map((item: { _id: string }) => item._id);
    

    const products = await Product.find({
      _id: {
        $in: productIds,
      },
    }).populate("vendor");

    if (products.length !== cart.length) {
      return res.status(400).json({
        message: "One or more products no longer exist",
      });
    }

    const orderItems = [];

    let total = 0;

    for (const cartItem of cart) {
      const product = products.find(
        (p) => p._id.toString() === cartItem._id.toString(),
      );

      if (!product) {
        return res.status(404).json({
          message: "Product not found",
        });
      }

      const quantity = Number(cartItem.quantity);

      if (quantity <= 0) {
        return res.status(400).json({
          message: "Invalid quantity",
        });
      }

      // IMPORTANT:
      // Price comes from MongoDB,
      // NOT localStorage.

      const itemTotal = product.price * quantity;

      total += itemTotal;

      orderItems.push({
        product: product._id,

        vendor: product.vendor,

        name: product.name,

        price: product.price,

        quantity,
      });
    }

    // --------------------------------------------------
    // 3. CREATE ORDER
    // --------------------------------------------------

    const order = await Order.create({
      customer: user?._id,

      items: orderItems,

      total,

      paymentStatus: "pending",

      orderStatus: "pending",
    });

    // --------------------------------------------------
    // 4. GROUP PRODUCTS BY VENDOR
    // --------------------------------------------------

    const vendorAmounts: Record<string, number> = {};

    for (const item of orderItems) {
      const vendorId = item.vendor.toString();

      if (!vendorAmounts[vendorId]) {
        vendorAmounts[vendorId] = 0;
      }

      vendorAmounts[vendorId] += item.price * item.quantity;
    }

    /*
      Example:

      Vendor A = ₦500,000
      Vendor B = ₦100,000
      Vendor C = ₦50,000
      Vendor D = ₦50,000

      Total = ₦700,000
    */

    // --------------------------------------------------
    // 5. GET VENDORS
    // --------------------------------------------------

    const vendorIds = Object.keys(vendorAmounts);

    const vendors = await Admin.find({
      _id: {
        $in: vendorIds,
      },
    });

    // --------------------------------------------------
    // 6. CHECK THAT EVERY VENDOR HAS PAYSTACK ACCOUNT
    // --------------------------------------------------

    // for (const vendor of vendors) {
    //   if (!vendor.paystackSubaccountCode) {
    //     return res.status(400).json({
    //       message: `${vendor.accountName} has not connected a Paystack account`,
    //     });
    //   }
    // }

    // --------------------------------------------------
    // 7. CREATE PAYSTACK SPLIT DATA
    // --------------------------------------------------

    const subaccounts = vendors.map((vendor) => {
      const vendorAmount = vendorAmounts[vendor._id.toString()];

      // FEXA takes 10%
      const fexaCommission = vendorAmount * 0.1;

      // Vendor gets 90%
      const vendorGets = vendorAmount - fexaCommission;

      return {
        subaccount: vendor.paystackSubaccountCode,

        amount: Math.round(vendorGets * 100),
      };
    });

    // --------------------------------------------------
    // 8. INITIALIZE PAYSTACK
    // --------------------------------------------------

    const paystackResponse = await axios.post(
      "https://api.paystack.co/transaction/initialize",

      {
        email: userDetails.email,

        // Paystack uses kobo
        amount: Math.round(total + userDetails.deliveryFee * 100),

        reference: `FEXA-${order._id}`,

        // Multi-vendor split
        // split: {
        //   type: "flat",

        //   currency: "NGN",

        //   subaccounts,
        // },
      },

      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,

          "Content-Type": "application/json",
        },
      },
    );

    // --------------------------------------------------
    // 9. SAVE PAYSTACK REFERENCE
    // --------------------------------------------------

    const reference = paystackResponse.data.data.reference;

    order.paymentReference = reference;

    await order.save();

    // --------------------------------------------------
    // 10. SEND PAYMENT URL TO REACT
    // --------------------------------------------------

    return res.status(200).json({
      success: true,

      authorization_url: paystackResponse.data.data.authorization_url,

      reference,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Unable to initialize payment",
    });
  }
};

export default initializePayment;
