// import { resend } from "../helpers/resend.helpers";

// export async function sendOrderConfirmation(userEmail: string, orderId: string) {
//   try {
//     const { data, error } = await resend.emails.send({
//       from: 'Fexa Store <onboarding@resend.dev>', // Use 'onboarding@resend.dev' for testing, or your custom verified domain in production
//       to: [userEmail],
//       subject: `Order Confirmation #${orderId}`,
//       html: `
//         <div style="font-family: sans-serif; color: #1e293b;">
//           <h2>Thank you for your order!</h2>
//           <p>Your order <strong>#${orderId}</strong> has been successfully placed and is being processed.</p>
//           <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
//           <p style="font-size: 12px; color: #64748b;">If you have any questions, feel free to reply to this email.</p>
//         </div>
//       `,
//     });

//     if (error) {
//       console.error('Failed to send email:', error);
//       return { success: false, error: error.message };
//     }

//     console.log('Email sent successfully:', data);
//     return { success: true, emailId: data?.id };
//   } catch (err) {
//     console.error('Unexpected error sending email:', err);
//     throw err;
//   }
// }