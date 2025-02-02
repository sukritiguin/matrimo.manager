import { FastifyPluginCallback } from "fastify";
import fp from "fastify-plugin";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

declare module "fastify" {
  interface FastifyInstance {
    prisma: PrismaClient;
  }
}

// ✅ Use fastify-plugin to avoid registration issues
const prismaPlugin: FastifyPluginCallback = async (fastify) => {
  if (!fastify.prisma) {
    fastify.decorate("prisma", prisma);
    console.log("✅ Prisma plugin registered!");

    fastify.addHook("onClose", async (instance) => {
      await instance.prisma.$disconnect();
    });
  }
};

export default fp(prismaPlugin); // ✅ Ensures plugin runs correctly
