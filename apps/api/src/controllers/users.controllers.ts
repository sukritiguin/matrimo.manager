import { client } from "@matrimo/db";
import { ApiError, apiHandler, ApiResponse } from "@matrimo/lib";
import { Request, Response } from "express";

const getMe = apiHandler(async (req: Request, res: Response) => {
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
});

export { getMe };
