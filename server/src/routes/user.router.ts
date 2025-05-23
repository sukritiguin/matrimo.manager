import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import argon2 from "argon2";
import { sendVerificationEmail } from "../services/email.services";

export default async function userRoutes(fastify: FastifyInstance) {
  // GET /users - Fetch all users
  fastify.get(
    "/",
    {
      schema: {
        description: "Get a list of all users",
        summary: "List Users",
        tags: ["Users"],
        response: {
          200: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: { type: "number" },
                email: { type: "string" },
                password: { type: "string" },
                verified: { type: "boolean" },
                googleId: { type: "string" },
                otp: { type: "string" },
                createdAt: { type: "string" },
                updatedAt: { type: "string" },
              },
            },
          },
          500: {
            type: "object",
            properties: {
              error: { type: "string" },
            },
          },
        },
      },
    },
    async (request, reply) => {
      if (!fastify.prisma) {
        // return reply.internalServerError("Prisma plugin not registered!");
      }

      try {
        const users = await fastify.prisma.user.findMany();
        return users;
      } catch (error) {
        console.error("Database Error:", error);
        // return reply.in("Failed to fetch users");
      }
    }
  );

  // POST /register-user - Register a new user
  fastify.post(
    "/register-user",
    {
      schema: {
        description: "Register a new user",
        summary: "Register User",
        tags: ["Auth"],
        body: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string", format: "email" },
            password: { type: "string", format: "password" },
          },
        },
        response: {
          201: {
            type: "object",
            properties: {
              id: { type: "number" },
              email: { type: "string" },
              password: { type: "string" },
            },
          },
          400: {
            type: "object",
            properties: {
              error: { type: "string" },
            },
          },
          500: {
            type: "object",
            properties: {
              error: { type: "string" },
            },
          },
        },
      },
    },
    async (request, reply) => {
      if (!fastify.prisma) {
        // return reply.internalServerError("Prisma plugin not registered!");
      }

      const { email, password } = request.body as {
        email: string;
        password: string;
      };

      const isUserPresent = await fastify.prisma.user.findUnique({
        where: { email: email },
      });

      if (isUserPresent) {
        return reply.code(505).send({ message: "User already exists." });
      }

      // Hash password
      const hashedPassword = await argon2.hash(password);

      try {
        const user = await fastify.prisma.user.create({
          data: { email, password: hashedPassword },
        });

        // Send email verification (Step 5)
        await sendVerificationEmail(user.email);
        return reply.code(201).send(user);
      } catch (error) {
        console.error("Database Error:", error);

        // Handle unique constraint violation (e.g., duplicate email)
        // Need to write logic here................................................................

        // return reply.internalServerError("Failed to create user");

        return reply.code(505).send({ message: "Database Error" });
      }
    }
  );

  // GET /verify - Verify the token sent over email
  fastify.post(
    "/verify",
    {
      schema: {
        description: "Verify email using a token sent via email",
        tags: ["Auth"],
        summary: "Email Verification",
        querystring: {
          type: "object",
          required: ["token"],
          properties: {
            token: { type: "string", description: "JWT verification token" },
            email: {
              type: "string",
              format: "email",
              description: "User email address",
            },
          },
        },
        response: {
          200: {
            description: "Email verification successful",
            type: "object",
            properties: {
              message: { type: "string" },
            },
          },
          400: {
            description: "Invalid or expired token",
            type: "object",
            properties: {
              message: { type: "string" },
            },
          },
        },
      },
    },
    async (
      req: FastifyRequest<{ Querystring: { token: string } }>,
      reply: FastifyReply
    ) => {
      try {
        const { token } = req.query as { token: string };

        // Verify token
        const { email } = fastify.jwt.verify(token) as { email: string };

        // if (decoded.email !== email) {
        //   return reply
        //     .status(400)
        //     .send({ message: "Invalid verification link." });
        // }

        // Update user status in DB (mark as verified)
        await fastify.prisma.user.update({
          where: { email },
          data: { verified: true },
        });

        // Generate JWT Token for automatic login
        const authToken = fastify.jwt.sign({ email }, { expiresIn: "7d" });

        // Set token in cookies (HTTP-Only, Secure)
        reply.setCookie("token", authToken, {
          httpOnly: true,
          secure: true, // Set to `false` if testing locally without HTTPS
          sameSite: "strict",
          path: "/",
        });

        return reply.send({ message: "Email verified successfully!" });
      } catch (error) {
        return reply.status(400).send({ message: "Invalid or expired token." });
      }
    }
  );

  // POST /logout - Log out the user by clearing the authentication token cookie
  fastify.post(
    "/logout",
    {
      schema: {
        description:
          "Log out the user by clearing the authentication token cookie",
        tags: ["Auth"],
        summary: "User Logout",
        response: {
          200: {
            description: "Logout successful",
            type: "object",
            properties: {
              message: { type: "string" },
            },
          },
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      reply.clearCookie("token", {
        path: "/",
        httpOnly: true,
        secure: true, // Set to false if testing locally without HTTPS
        sameSite: "strict",
      });

      return reply.send({ message: "Logged out successfully!" });
    }
  );
}
