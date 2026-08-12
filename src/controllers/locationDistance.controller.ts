import { Request, Response, NextFunction } from "express";
import axios from "axios";

const getDeliveryLocationDistance = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { destination, numberOfProduct } = req.body;
    

    if (!destination) {
      return res.status(400).json({
        success: false,
        message: "Delivery address is required",
      });
    }

    const origin = process.env.STORE_ADDRESS;

    const response = await axios.post(
      "https://routes.googleapis.com/directions/v2:computeRoutes",
      {
        origin: {
          address: origin,
        },
        destination: {
          address: destination,
          //   address: 'okuno otolo nnewi anambra state' ,
        },
        travelMode: "DRIVE",
        routingPreference: "TRAFFIC_UNAWARE",
        computeAlternativeRoutes: false,
        units: "METRIC",
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": process.env.GOOGLE_MAPS_API_KEY,
          "X-Goog-FieldMask": "routes.distanceMeters,routes.duration",
        },
      },
    );

    const route = response.data.routes?.[0];
    console.log(route);

    if (!route) {
      return res.status(400).json({
        success: false,
        message: "Could not calculate delivery distance",
      });
    }

    const distanceKm = route.distanceMeters / 1000;

    // Calculate delivery fee
    let deliveryFee;

    if (distanceKm <= 5) {
      deliveryFee = 2000;
    } else if (distanceKm <= 10) {
      deliveryFee = 3500;
    } else if (distanceKm <= 20) {
      deliveryFee = 6000;
    } else if (distanceKm <= 30) {
      deliveryFee = 7500;
    } else if (distanceKm <= 40) {
      deliveryFee = 9000;
    } else {
      deliveryFee = Math.ceil(distanceKm) * numberOfProduct * 20;
    }

    return res.status(200).json({
      success: true,
      distance: Number(distanceKm.toFixed(2)),
      deliveryFee,
      duration: route.duration,
    });
  } catch (error) {
    // console.error(
    //   "Delivery calculation error:",
    //   error.response?.data || error.message
    // );

    // return res.status(500).json({
    //   success: false,
    //   message: "Unable to calculate delivery fee",
    // });

    console.log(error);
    next(error);
  }
};

export default getDeliveryLocationDistance;
