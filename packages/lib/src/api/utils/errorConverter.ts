import { Request, Response, NextFunction } from "express";
import { ApiError } from "./apiError.js";

export const errorConverter = (
  err: unknown,
  _req: Request,
  _res: Response,
  next: NextFunction
) => {
  let error = err;

  if (!(error instanceof ApiError)) {
    const statusCode = (error as { statusCode?: number }).statusCode || 500;

    const message = (error as Error).message || "Internal Server Error";

    error = new ApiError(
      statusCode,
      message,
      (error as Error).stack // preserve stack trace
    );
  }
  next(error);
};
