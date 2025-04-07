import { ApiError, apiHandler } from "@matrimo/lib";
import { Request, Response, NextFunction } from "express";

import { verifyAccessToken } from "../utils/accessToken.js";
import { getUserById } from "../data/users.data.js";
import { User } from "@matrimo/db";

declare global {
  namespace Express {
    interface Request {
      currentUser?: User;
    }
  }
}

export const authenticate = apiHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.headers.authorization?.split(" ")[1];
    if (!accessToken) throw new ApiError(401, "Unauthorized user");

    const userId = verifyAccessToken(accessToken);
    if (!userId) throw new ApiError(401, "Access token is not valid");

    const user = await getUserById(parseInt(userId));
    if (!user) throw new ApiError(401, "User not found");

    req.currentUser = user;

    next();
  }
);
