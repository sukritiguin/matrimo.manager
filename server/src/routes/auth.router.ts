// src/routes/authRoutes.ts
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import otpGenerator from "otp-generator";
import { sendOTPEmail } from "../services/email.services";

export default async function authRoutes(fastify: FastifyInstance) {
  // Callback route for Google OAuth
  fastify.get("/login/google/callback", async (req, reply) => {
    try {
      // Get the access token from the authorization code
      const { token } =
        await fastify.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(req);

      // Fetch the user's profile information from Google
      const userInfo = await fetch(
        "https://www.googleapis.com/oauth2/v2/userinfo",
        {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }
      ).then((res) => res.json());

      // Check if the user already exists in the database
      let user = await fastify.prisma.user.findUnique({
        where: { email: userInfo.email },
      });

      // If the user doesn't exist, create a new user
      if (!user) {
        user = await fastify.prisma.user.create({
          data: {
            email: userInfo.email,
            googleId: userInfo.id,
            verified: true, // Mark as verified since it's from Google
          },
        });
      }

      // Generate a JWT for the user
      const jwt = fastify.jwt.sign({ userId: user.id });

      // Set the JWT in a cookie or return it in the response
      reply.setCookie("token", jwt, { httpOnly: true, path: "/" });
      reply.send({ message: "Logged in with Google.", user });
    } catch (err) {
      reply.status(500).send({ message: "Google OAuth failed.", error: err });
    }
  });

  // Route for Google OAuth login initiation
  fastify.post(
    "/login/otp",
    async (
      req: FastifyRequest<{ Body: { email: string } }>,
      reply: FastifyReply
    ) => {
      const { email } = req.body;

      // Generate OTP
      const otp = otpGenerator.generate(6, {
        digits: true,
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
      });

      // Save OTP in database
      const existingUser = await fastify.prisma.user.findUnique({
        where: { email: email },
      });
      if (existingUser) {
        await fastify.prisma.user.update({
          where: { email },
          data: { otp, otpExpiry: new Date(Date.now() + 10 * 60 * 1000) }, // OTP valid for 10 minutes
        });
      } else {
        await fastify.prisma.user.create({
          data: {
            email: email,
            otp: otp,
            otpExpiry: new Date(Date.now() + 10 * 60 * 1000),
          },
        });
      }

      // Send OTP via email or SMS
      await sendOTPEmail(email, otp);

      reply.send({ message: "OTP sent to your email." });
    }
  );

  fastify.post(
    "/login/otp/verify",
    async (
      req: FastifyRequest<{ Body: { email: string; otp: string } }>,
      reply: FastifyReply
    ) => {
      const { email, otp } = req.body;

      const user = await fastify.prisma.user.findUnique({ where: { email } });

      if (!user || user.otp !== otp || new Date() > user.otpExpiry!) {
        reply.status(400).send({ message: "Invalid or expired OTP." });
        return;
      }

      // Generate JWT
      const jwt = fastify.jwt.sign({ userId: user.id });

      // Set JWT in cookie
      reply.setCookie("token", jwt, { httpOnly: true, path: "/" });
      await fastify.prisma.user.update({
        where: { email },
        data: { verified: true },
      });
      reply.send({ message: "Logged in successfully." });
    }
  );
}
