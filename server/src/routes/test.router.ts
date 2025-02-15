import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { authMiddleware } from "../middlewares/auth.middleware";

export default async function testRoutes(fastify: FastifyInstance) {
    fastify.get("/protected-route" , {preHandler: [authMiddleware]}, async (req: FastifyRequest, reply: FastifyReply) => {
        reply.send({ message: "Hello, World!" });
    });   
}