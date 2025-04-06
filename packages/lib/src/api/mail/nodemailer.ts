import { Logger } from "@matrimo/logger";
import { createTransport } from "nodemailer";

const nodemailerLogger = new Logger("Nodemailer");

nodemailerLogger.log(
  "GOOGLE_EMAIL_APP_SENDER_EMAIL ",
  process.env.GOOGLE_EMAIL_APP_SENDER_EMAIL
);

const transporter = createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.GOOGLE_EMAIL_APP_SENDER_EMAIL,
    pass: process.env.GOOGLE_EMAIL_APP_PASSWORD,
  },
  tls: {
    ciphers: "SSLv3",
    rejectUnauthorized: false,
  },
});

export async function sendEmail(
  to: string,
  subject: string,
  text: string
): Promise<void> {
  try {
    const mailOptions = {
      from: process.env.GOOGLE_EMAIL_APP_SENDER_EMAIL,
      to,
      subject,
      text,
    };

    const info = await transporter.sendMail(mailOptions);
    nodemailerLogger.log(`Email sent to ${to}: ${info.response}`);
  } catch (error) {
    nodemailerLogger.error("Error sending email:", error);
  }
}
