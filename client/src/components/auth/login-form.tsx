import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TUserLoginSchema, UserLoginSchema } from "../../schemas";

import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { userLogin } from "@/services/auth.service";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useVerifyEmailDialog } from "@/hooks/use-verify-email-dialog";

export default function LoginForm() {
  const navigate = useNavigate();
  const dialog = useVerifyEmailDialog();

  const form = useForm<TUserLoginSchema>({
    resolver: zodResolver(UserLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const queryClient = useQueryClient();
  const { mutate: login } = useMutation({
    mutationKey: ["user", "login"],
    mutationFn: userLogin,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["user", "me"] });
      form.reset();
      navigate("/", { relative: "path" });
    },
    onError: (error: unknown) => {
      if (error instanceof AxiosError) {
        if (error.status === 403) {
          localStorage.setItem("email", form.getValues("email"));
          dialog.handleOpenChange(true);
        }
      }
    },
  });

  async function onSubmit(values: TUserLoginSchema) {
    login(values);
  }

  return (
    <React.Fragment>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Email Address"
                    type="email"
                    className="border border-[#DAA520] shadow-md"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Password"
                    type="password"
                    className="border border-[#DAA520] shadow-md"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Login</Button>
        </form>
      </Form>
    </React.Fragment>
  );
}
