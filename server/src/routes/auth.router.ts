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

        // Generate JWT Token for automatic login
        const authToken = fastify.jwt.sign({email: user.email }, { expiresIn: "7d" }); // Token valid for 7 days

        // Set token in cookies (HTTP-Only, Secure)
        reply.setCookie("token", authToken, {
          httpOnly: true,
          secure: true, // Set to `false` if testing locally without HTTPS
          sameSite: "strict",
          path: "/",
        });
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

        try {
          await fastify.prisma.user.create({
            data: {
              email: email,
              otp: otp,
              otpExpiry: new Date(Date.now() + 10 * 60 * 1000),
            },
          });
        } catch (error) {
          console.log("Faced error while creating user with otp login", error);
        }
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
      console.log("Verifying OTP for user:", user);

      if (!user || user.otp !== otp || new Date() > user.otpExpiry!) {
        reply.status(400).send({ message: "Invalid or expired OTP." });
        return;
      }

      // Generate JWT Token for automatic login
      const authToken = fastify.jwt.sign({email: user.email }, { expiresIn: "7d" }); // Token valid for 7 days

      // Set token in cookies (HTTP-Only, Secure)
      reply.setCookie("token", authToken, {
        httpOnly: true,
        secure: true, // Set to `false` if testing locally without HTTPS
        sameSite: "strict",
        path: "/",
      });
      reply.send({ message: "Logged in successfully." });
    }
  );
}
