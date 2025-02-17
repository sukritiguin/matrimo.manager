import { z } from "zod";

export const UserRegisterSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const UserLoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type TUserRegisterSchema = z.infer<typeof UserRegisterSchema>;
export type TUserLoginSchema = z.infer<typeof UserLoginSchema>;
