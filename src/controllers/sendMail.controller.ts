import {Request, Response, NextFunction} from 'express';
// import { sendOrderConfirmation } from '../services/mail.services';

// export const sendMail = async (req: Request, res: Response, next:NextFunction) => {
//   try {
//       await sendOrderConfirmation('sharkollymofeoluwa@gmail.com', '12w2efg34jn56qdeqvda7d8d');
//       res.status(201).json({message: 'Sent successfully', status: true});
//   }

//   catch(err) {
//     next(err);
//   }
// }

// import sendEmail from "../utils/sendEmail.js";

// export const welcomeUser = async (req: Request, res: Response) => {
//   try {
//     const { email } = req.body;

//     if (!email) {
//       return res.status(400).json({
//         message: "Email address is required",
//       });
//     }

//     await sendEmail({
//       to: email,
//       subject: "Welcome to Foland Realty!",
//       html: `
//         <h2>Welcome to Foland Realty!</h2>
//         <p>Your account has been created successfully.</p>
//         <p>We're happy to have you with us.</p>
//       `,
//     });

//     return res.status(200).json({
//       success: true,
//       message: "Email sent successfully",
//     });
//   } catch (error) {
//     console.error("Email error:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Unable to send email",
//     });
//   }
// };