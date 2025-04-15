import { z } from "zod";

export const requiredString = (value: string) => (message?: string) =>
  z.string({
    required_error: message || `${value} is required`,
  });

export const requiredNumber = (value: string) => (message?: string) =>
  z.number({
    required_error: message || `${value} is required`,
  });
