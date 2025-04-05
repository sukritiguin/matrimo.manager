import { ErrorRequestHandler, NextFunction, Response, Request } from "express";
import { ApiError } from "./apiError.js";
import { apiLogger } from "./apiLogger.js";

interface CustomResponse extends Response {
  locals: {
    error?: {
      message: string;
      statusCode: number;
      stack?: string;
    };
  };
}

export const errorHandler: ErrorRequestHandler = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { statusCode, message } = err;

  res.locals.error = {
    message,
    statusCode,
    stack: err.stack,
  };

  const response = {
    error: {
      code: statusCode,
      message,
      ...(process.env.NODE_ENV === "development" && {
        stack: err.stack,
      }),
    },
  };

  if (process.env.NODE_ENV === "development") {
    apiLogger.error("[Error Handler]", JSON.stringify(err));
  }

  res.status(statusCode).json(response);
};
