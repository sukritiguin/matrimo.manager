import { Response } from "express";

interface IApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

export class ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;

  constructor(success: boolean, message: string, data?: T) {
    this.success = success;
    this.message = message;
    this.data = data;
  }

  static success<T>(message: string, data?: T): ApiResponse<T> {
    return new ApiResponse<T>(true, message, data);
  }

  static error<T>(message: string, data?: T): ApiResponse<T> {
    return new ApiResponse<T>(false, message, data);
  }
}

export const sendResponse = <T>(
  res: Response,
  data: IApiResponse<T>
): Response => {
  const response: IApiResponse<T> = {
    success: true,
    message: data.message || "Success",
    data: data.data,
  };

  return res.status(200).json(response);
};

export const sendEmptyResponse = (
  res: Response,
  message = "No content"
): Response => {
  return res.status(204).json({
    success: true,
    message,
  });
};

export const sendCreatedResponse = <T>(
  res: Response,
  message: string,
  data?: T
): Response => {
  const response: IApiResponse<T> = {
    success: true,
    message,
    data,
  };

  return res.status(201).json(response);
};
