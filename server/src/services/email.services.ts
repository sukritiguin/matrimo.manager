import nodemailer from "nodemailer";
import { fastify } from "../server";

console.log(
  "🤔🤔 GOOGLE_EMAIL_APP_SENDER_EMAIL ",
  process.env.GOOGLE_EMAIL_APP_SENDER_EMAIL
);
console.log(
  "🤔🤔 GOOGLE_EMAIL_APP_PASSWORD:",
  process.env.GOOGLE_EMAIL_APP_PASSWORD
);

// if (
//   !process.env.GOOGLE_EMAIL_APP_SENDER_EMAIL ||
//   !process.env.GOOGLE_EMAIL_APP_PASSWORD
// ) {
//   throw new Error(
//     "Missing required email credentials in environment variables."
//   );
// }

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Must be false for STARTTLS
  auth: {
    user: process.env.GOOGLE_EMAIL_APP_SENDER_EMAIL!,
    pass: process.env.GOOGLE_EMAIL_APP_PASSWORD!,
  },
  tls: {
    ciphers: "SSLv3", // Ensures compatibility
    rejectUnauthorized: false, // For development, should be `true` in production
  },
});

/**
 * Sends an email using Nodemailer
 * @param {string} to - Recipient email address
 * @param {string} subject - Email subject
 * @param {string} text - Email body text
 */
async function sendEmail(
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
    console.log(`✅ Email sent to ${to}: ${info.response}`);
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
}

/**
 * Sends a verification email with a JWT token
 * @param {string} email - Recipient's email address
 */
async function sendVerificationEmail(email: string): Promise<void> {
  try {
    const verificationToken = fastify.jwt.sign({ email }, { expiresIn: "1h" });
    const verificationLink = `${process.env.CLIENT_BASE_URL}/auth/verify?token=${verificationToken}`;

    await sendEmail(
      email,
      "Verify Your Email",
      `Click the link to verify your email: ${verificationLink}`
    );
  } catch (error) {
    console.error("❌ Error sending verification email:", error);
  }
}

/**
 * Sends an OTP email
 * @param {string} email - Recipient's email address
 * @param {string} otp - One-time password
 */
async function sendOTPEmail(email: string, otp: string): Promise<void> {
  try {
    await sendEmail(
      email,
      "Verify Your Email",
      `Your OTP to log in is: ${otp}`
    );
  } catch (error) {
    console.error("❌ Error sending OTP email:", error);
  }
}

export { sendVerificationEmail, sendOTPEmail };
