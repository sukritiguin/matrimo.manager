import { NextFunction, Request, Response } from "express";
import { ApiError } from "./apiError.js";

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const err = new ApiError(404, `Not found - ${req.method} ${req.originalUrl}`);
  next(err);
};
