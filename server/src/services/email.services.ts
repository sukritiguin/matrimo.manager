import nodemailer from "nodemailer";
import { fastify } from "../server";

const transporter = nodemailer.createTransport({
  secure: true,
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: process.env.GOOGLE_EMAIL_APP_SENDER_EMAIL,
    pass: process.env.GOOGLE_EMAIL_APP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false, // Disables strict SSL certificate verification
  },
});

async function sendVerificationEmail(email: string) {
  const verificationToken = fastify.jwt.sign({ email }, { expiresIn: "1h" }); // Token expires in 1 hour) // Use JWT or crypto.randomBytes
  const mailOptions = {
    from: process.env.GOOGLE_EMAIL_APP_SENDER_EMAIL,
    to: email,
    subject: "Verify Your Email",
    text: `Click the link to verify your email: ${process.env.BASE_URL}/verify?token=${verificationToken}&email=${email}`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log("Error sending email", error);
  }
}

async function sendOTPEmail(email: string, otp: string) {
  const mailOptions = {
    from: process.env.GOOGLE_EMAIL_APP_SENDER_EMAIL,
    to: email,
    subject: "Verify Your Email",
    text: `Your OTP to log is: ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log("Error sending email", error);
  }
}

export { sendVerificationEmail, sendOTPEmail };
