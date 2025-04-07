import z from "zod";
import { ApiError } from "./apiError";

export const zodValidation = <T extends z.ZodTypeAny>(
  schema: T,
  data: unknown
): z.infer<T> => {
  if (!data) {
    throw new ApiError(400, "All field is required");
  }
  const validatedData = schema.safeParse(data);

  if (!validatedData.success) {
    const errors = validatedData.error.errors.map((e) => e.message);
    throw new ApiError(400, errors[0] || "Validation failed");
  }

  return validatedData.data;
};
