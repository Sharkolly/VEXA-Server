// import { Resend } from 'resend';

// export const resend = new Resend(process.env.RESEND_API_KEY);

import dotenv from "dotenv";
dotenv.config();

import { BrevoClient } from "@getbrevo/brevo";

import { welcomeEmailTemplate } from "../templates/welcomeEmail";

const BREVO_API_KEY = process.env.BREVO_API_KEY;
if (!BREVO_API_KEY) {
  throw new Error("No api key found!");
}
const brevo = new BrevoClient({
  apiKey: BREVO_API_KEY,
});

type emailType = {
  to: string;
  subject: string;
  html?: string;
  firstName: string;
};



const sendEmail = async ({ to, subject, firstName }: emailType) => {

    const getHTML = welcomeEmailTemplate({
      firstName,
      websiteUrl: "https://fexa-store.vercel.app/shop",
    });
  const result = await brevo.transactionalEmails.sendTransacEmail({
    sender: {
      name: "FEXA",
      email: process.env.FEXA_EMAIL,
    },
    to: [{ email: to }],
    subject,
    htmlContent: getHTML,
  });

  return result;
};

export default sendEmail;
