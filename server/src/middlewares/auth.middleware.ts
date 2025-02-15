import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import fastify from "../server";

interface JwtAuthMiddlewarePayload {
    email: string;
}

export async function authMiddleware(req: FastifyRequest, reply: FastifyReply) {
    try{
        const token = req.cookies.token;

        if(!token){
            return reply.status(401).send({ message: "Unauthorized: No token provided" });
        }

        const decodedToken = fastify.jwt.decode<JwtAuthMiddlewarePayload>(token);
        if(!decodedToken){
            return reply.status(401).send({ message: "Unauthorized: Invalid token" });
        }

        const decodedEmail = decodedToken.email;

        if(!decodedEmail){
            return reply.send({ message: "Unauthorized: Invalid token" });
        }

        const user = await fastify.prisma.user.findUnique({
            where: { email: decodedEmail }
        });

        if(!user){
            return reply.send({ message: "Unauthorized: User not found" });
        }

        req.user = user;

    }catch(err){
        console.log("Auth middleware error", err);
        return reply.send({ message: "Unauthorized" });
    }
}

