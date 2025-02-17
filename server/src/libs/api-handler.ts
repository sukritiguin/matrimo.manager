import { FastifyReply, FastifyRequest } from "fastify";
import { ApiError } from "./response";

export const apiHandler = (fun: Function) => {
  return async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      await fun(req, reply);
    } catch (error: any) {
      const route = req.url.split("api")[1];
      console.error(`[${route}] || Error :: ${error.message}`);
      if (error instanceof ApiError) {
        return reply.status(error.statusCode).send(error);
      } else {
        return reply
          .status(500)
          .send(new ApiError(500, "Internal Server Error"));
      }
    }
  };
};
