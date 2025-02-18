import { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";

declare module "fastify" {
  interface FastifyInstance {
    prisma: PrismaClient;
    googleOAuth2: any;
    authenticate: (req: FastifyRequest, reply: FastifyReply) => Promise<any>;
  }
}
