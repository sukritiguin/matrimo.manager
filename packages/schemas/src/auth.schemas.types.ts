import z from "zod";
import { signInSchema, signUpSchema } from "auth.schemas";

export type SignInSchema = z.infer<typeof signInSchema>;
export type SignUpSchema = z.infer<typeof signUpSchema>;
