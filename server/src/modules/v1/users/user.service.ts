import { FastifyReply, FastifyRequest } from "fastify";
import { apiHandler } from "../../../libs/api-handler";
import { ApiError, ApiResponse } from "../../../libs/response";

export const getMe = apiHandler(
  async (req: FastifyRequest, reply: FastifyReply) => {
    // Check if user is authenticated
    if (!req.user) {
      throw new ApiError(401, "Unauthorized: No user authenticated");
    }

    return reply
      .code(200)
      .send(
        new ApiResponse(
          200,
          { user: req.user },
          "User data retrieved successfully"
        )
      );
  }
);
