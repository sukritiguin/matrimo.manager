import { FastifyInstance } from "fastify";

export default async function userRoutes(fastify: FastifyInstance) {
  // GET /users - Fetch all users
  fastify.get(
    "/users",
    {
      schema: {
        description: "Get a list of all users",
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
        return reply.internalServerError("Prisma plugin not registered!");
      }

      try {
        const users = await fastify.prisma.user.findMany();
        return users;
      } catch (error) {
        console.error("Database Error:", error);
        return reply.internalServerError("Failed to fetch users");
      }
    }
  );

  // POST /users - Create a new user
  fastify.post(
    "/users",
    {
      schema: {
        description: "Create a new user",
        tags: ["Users"],
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
        return reply.internalServerError("Prisma plugin not registered!");
      }

      const { email, password } = request.body as {
        email: string;
        password: string;
      };

      try {
        const user = await fastify.prisma.user.create({
          data: { email, password },
        });
        return reply.code(201).send(user);
      } catch (error) {
        console.error("Database Error:", error);

        // Handle unique constraint violation (e.g., duplicate email)
        // Need to write logic here................................................................

        return reply.internalServerError("Failed to create user");
      }
    }
  );
}
