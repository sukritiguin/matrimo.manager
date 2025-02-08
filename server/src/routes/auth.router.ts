// src/routes/authRoutes.ts
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import otpGenerator from "otp-generator";
import { sendOTPEmail } from "../services/email.services";

export default async function authRoutes(fastify: FastifyInstance) {
  
  /**
   * Google OAuth Callback
   */
  fastify.get(
    "/login/google/callback",
    {
      schema: {
        description: "Google OAuth callback to authenticate users",
        tags: ["Auth"],
        summary: "Google OAuth Callback",
        response: {
          200: {
            description: "Successful authentication",
            type: "object",
            properties: {
              message: { type: "string" },
              user: {
                type: "object",
                properties: {
                  email: { type: "string" },
                  googleId: { type: "string" },
                  verified: { type: "boolean" },
                },
              },
            },
          },
          500: {
            description: "Google OAuth authentication failed",
            type: "object",
            properties: {
              message: { type: "string" },
              error: { type: "string" },
            },
          },
        },
      },
    },
    async (req: FastifyRequest, reply: FastifyReply) => {
      try {
        const { token } = await fastify.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(req);

        const userInfo = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }).then((res) => res.json());

        let user = await fastify.prisma.user.findUnique({ where: { email: userInfo.email } });

        if (!user) {
          user = await fastify.prisma.user.create({
            data: {
              email: userInfo.email,
              googleId: userInfo.id,
              verified: true,
            },
          });
        }

        const authToken = fastify.jwt.sign({ email: user.email }, { expiresIn: "7d" });

        reply.setCookie("token", authToken, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          path: "/",
        });

        reply.send({ message: "Logged in with Google.", user });
      } catch (err: any) {
        reply.status(500).send({ message: "Google OAuth failed.", error: err.message });
      }
    }
  );

  /**
   * Request OTP for Login
   */
  fastify.post(
    "/login/otp",
    {
      schema: {
        description: "Request an OTP for email login",
        tags: ["Auth"],
        summary: "Request OTP",
        body: {
          type: "object",
          required: ["email"],
          properties: {
            email: { type: "string", format: "email" },
          },
        },
        response: {
          200: {
            description: "OTP sent successfully",
            type: "object",
            properties: {
              message: { type: "string" },
            },
          },
        },
      },
    },
    async (req: FastifyRequest<{ Body: { email: string } }>, reply: FastifyReply) => {
      const { email } = req.body;

      const otp = otpGenerator.generate(6, {
        digits: true,
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
      });

      const existingUser = await fastify.prisma.user.findUnique({ where: { email } });

      if (existingUser) {
        await fastify.prisma.user.update({
          where: { email },
          data: { otp, otpExpiry: new Date(Date.now() + 10 * 60 * 1000) },
        });
      } else {
        await fastify.prisma.user.create({
          data: {
            email,
            otp,
            otpExpiry: new Date(Date.now() + 10 * 60 * 1000),
          },
        });
      }

      await sendOTPEmail(email, otp);

      reply.send({ message: "OTP sent to your email." });
    }
  );

  /**
   * Verify OTP for Login
   */
  fastify.post(
    "/login/otp/verify",
    {
      schema: {
        description: "Verify OTP for login and authenticate user",
        tags: ["Auth"],
        summary: "Verify OTP",
        body: {
          type: "object",
          required: ["email", "otp"],
          properties: {
            email: { type: "string", format: "email" },
            otp: { type: "string", minLength: 6, maxLength: 6 },
          },
        },
        response: {
          200: {
            description: "OTP verified successfully",
            type: "object",
            properties: {
              message: { type: "string" },
            },
          },
          400: {
            description: "Invalid or expired OTP",
            type: "object",
            properties: {
              message: { type: "string" },
            },
          },
        },
      },
    },
    async (req: FastifyRequest<{ Body: { email: string; otp: string } }>, reply: FastifyReply) => {
      const { email, otp } = req.body;

      const user = await fastify.prisma.user.findUnique({ where: { email } });

      if (!user || user.otp !== otp || new Date() > user.otpExpiry!) {
        reply.status(400).send({ message: "Invalid or expired OTP." });
        return;
      }

      const authToken = fastify.jwt.sign({ email: user.email }, { expiresIn: "7d" });

      reply.setCookie("token", authToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
      });

      reply.send({ message: "Logged in successfully." });
    }
  );
}
