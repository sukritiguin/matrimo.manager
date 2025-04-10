import z from "zod";

export const requiredString = (field: string) =>
  z.string({ required_error: `${field} is required` });
