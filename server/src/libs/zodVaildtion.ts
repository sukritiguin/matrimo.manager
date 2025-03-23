import z from "zod";
import { ApiError } from "./response";

export const zodValidation = <T extends z.ZodTypeAny>(
  schema: T,
  data: unknown
): z.infer<T> => {
  const validatedData = schema.safeParse(data);

  if (!validatedData.success) {
    const errors = validatedData.error.errors.map((e) => e.message);
    console.log("Validation error", validatedData.error.errors);
    throw new ApiError(400, errors[0], errors);
  }

  return validatedData.data;
};
