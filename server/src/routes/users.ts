import { FastifyInstance } from "fastify";

export default async function userRoutes(fastify: FastifyInstance) {
  console.log("🔍 Fastify Plugins:", fastify); // Debugging log

  fastify.get("/users", async (request, reply) => {
    console.log("🔍 fastify.prisma:", fastify.prisma); // Debugging log
    if (!fastify.prisma) {
      reply.status(500).send({ error: "Prisma plugin not registered!" });
      return;
    }
    const users = await fastify.prisma.user.findMany();
    return users;
  });

  fastify.post("/users", async (request, reply) => {
    console.log("🔍 fastify.prisma:", fastify.prisma); // Debugging log
    if (!fastify.prisma) {
      reply.status(500).send({ error: "Prisma plugin not registered!" });
      return;
    }

    const { email, password } = request.body as {
      email: string;
      password: string;
    };

    try {
      const user = await fastify.prisma.user.create({
        data: { email, password },
      });
      return user;
    } catch (error) {
      console.error("Database Error:", error);
      reply.status(500).send({ error: "Internal Server Error" });
    }
  });
}
