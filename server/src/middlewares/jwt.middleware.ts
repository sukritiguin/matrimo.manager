import { FastifyReply, FastifyRequest } from "fastify";
import { ApiError } from "../libs/response";
import fastify from "../server";

export const jwtMiddleware = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const access_token = req.cookies?.access_token;
    if (!access_token) {
      throw new ApiError(401, "Access token not provided");
    }
    const decodedToken: any = fastify.jwt.verify(access_token);
    if (!decodedToken) {
      throw new ApiError(401, "Invalid access token");
    }
    const user = await fastify.prisma.user.findUnique({
      where: { id: decodedToken.id },
      select: {
        id: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        verified: true,
      },
    });

    if (!user) {
      throw new ApiError(401, "User not found");
    }
    req.user = user;
  } catch (err: any) {
    if (err instanceof ApiError) {
      reply.status(err.statusCode).send(err);
      return;
    }
    reply
      .status(401)
      .send(new ApiError(err.statusCode || 401, "Access denied"));
  }
};
