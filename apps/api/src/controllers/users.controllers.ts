import { client } from "@matrimo/db";
import { ApiError, apiHandler, ApiResponse } from "@matrimo/lib";
import { Request, Response } from "express";
import { logger } from "../utils/logger.js";

const getMe = apiHandler(async (req: Request, res: Response) => {
  try {
    const user = await client.user.findUnique({
      where: {
        id: req.currentUser?.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        bio: true,
        emailVerified: true,
        onBoarding: true,
        createdAt: true,
        verified: true,
      },
    });

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    return res.status(200).json(new ApiResponse(true, "Ok", { user }));
  } catch (error) {
    if (error instanceof ApiError) throw error;
    logger.debug("ERROR IN GET ME", error);
    throw new ApiError(500, "Something went wrong");
  }
});

export { getMe };
