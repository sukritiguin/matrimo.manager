import * as React from "react";
import { Link } from "@tanstack/react-router";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema, signUpSchema } from "@/schemas/auth.schema";
import { useSession } from "@/hooks/useSession";
import { FormErrorMessage } from "../FormMessage";
import { Loader2 } from "lucide-react";

export const SignupForm: React.FC = () => {
  const {
    signup: { mutateAsync: signup, isError, error, isPending },
  } = useSession();

  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function handleFormSubmit(values: SignUpSchema) {
    signup(values).then(() => form.reset());
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)}>
        <div className="grid gap-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="matrimo@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem hidden={!form.watch("email")}>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormErrorMessage isError={isError} error={error?.message} />

          <Button type="submit" className="w-full">
            {isPending && <Loader2 className="size-5 animate-spin" />}
            Sign up
          </Button>
        </div>

        <div className="text-center text-xs py-3">
          I have an account?{" "}
          <Link to="/auth/signin" className="underline underline-offset-4">
            Sign in
          </Link>
        </div>
      </form>
    </Form>
  );
};
