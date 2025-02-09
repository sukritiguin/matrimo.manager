import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { authMiddleware } from "../middlewares/auth.middleware";
import { request } from "http";

export default async function profileRoutes(fastify: FastifyInstance) {
  fastify.post(
    "/create-profile",
    { preHandler: [authMiddleware] },
    async (request, reply) => {
      if (!fastify.prisma) {
        return reply.internalServerError("Prisma plugins not generated..");
      }

      const { firstName, lastName, profilePicURL } = request.body as {
        firstName: string;
        lastName: string;
        profilePicURL: string;
      };

      const email = (request.user as { email: string }).email;

      const userProfile = await fastify.prisma.profile.findUnique({
        where: { email: email },
      });

      if (userProfile) {
        return reply.code(501).badRequest();
      }

      try {
        const profile = await fastify.prisma.profile.create({
          data: {
            email: email,
            firstName: firstName,
            lastName: lastName,
            profilePicURL: profilePicURL,
          },
        });
        reply.code(200).send(profile);
      } catch (error) {
        console.log(error);
        reply.internalServerError("Failed to create user");
      }
    }
  );
  fastify.put(
    "/update-Profile",
    { preHandler: [authMiddleware] },
    async (request, reply) => {
      const email = (request.user as { email: string }).email;
      const { firstName, lastName, profilePicURL } = request.body as {
        firstName: string;
        lastName: string;
        profilePicURL: string;
      };
      try {
        const updatedProfile = await fastify.prisma.profile.update({
          where: { email: "user@example.com" },
          data: {
            firstName: firstName,
            lastName: lastName,
            profilePicURL: profilePicURL,
          },
        });
        return reply.code(200).send(updatedProfile);
      } catch {
        return reply.code(501).send("bad gateway..");
      }

      // console.log(updatedProfile);
    }
  );
}
