import { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import "@fastify/jwt";
import { TUser } from "./user";

declare module "fastify" {
  interface FastifyInstance {
    prisma: PrismaClient;
    googleOAuth2: any;
    authenticate: (req: FastifyRequest, reply: FastifyReply) => Promise<any>;
  }
}

declare module "@fastify/jwt" {
  interface FastifyJWT {
    user: TUser | undefined;
  }
}
