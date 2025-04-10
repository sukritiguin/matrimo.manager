import { requiredString } from "./common";
import * as z from "zod";

export const signUpSchema = z
  .object({
    email: requiredString("Email").email(),
    password: requiredString("Password"),
  })
  .refine((data) => !!data, {
    message: "Request body is required",
  });

export const signInSchema = z
  .object({
    email: z.string({ message: "Email is required" }).email(),
    password: z.string({ message: "Password is required" }),
  })
  .refine((data) => !!data, {
    message: "Request body is required",
  });

  export type SignInSchema = z.infer<typeof signInSchema>
  export type SignUpSchema = z.infer<typeof signUpSchema>