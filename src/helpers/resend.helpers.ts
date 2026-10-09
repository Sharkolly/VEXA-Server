// import { Resend } from 'resend';

// export const resend = new Resend(process.env.RESEND_API_KEY);

import dotenv from "dotenv";
dotenv.config();

import { BrevoClient } from "@getbrevo/brevo";

const BREVO_API_KEY = process.env.BREVO_API_KEY
if (!BREVO_API_KEY) {
  throw new Error("No api key found!");
}
const brevo = new BrevoClient({
  apiKey: BREVO_API_KEY,
});

type emailType = {
  to: string;
  subject: string;
  html: string;
};

const sendEmail = async ({ to, subject, html }: emailType) => {
  const result = await brevo.transactionalEmails.sendTransacEmail({
    sender: {
      name: "Foland Realty",
      email: "YOUR_VERIFIED_SENDER_EMAIL",
    },
    to: [{ email: to }],
    subject,
    htmlContent: html,
  });

  return result;
};

export default sendEmail;
