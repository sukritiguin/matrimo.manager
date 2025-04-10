import { createFileRoute } from "@tanstack/react-router";

import React from "react";
import { AuthPageWrapper } from "@/components/auth/AuthPageWrapper";
import { AuthPageHeader } from "@/components/auth/AuthPageHeader";
import { SignupForm } from "@/components/auth/SignupForm";

export const Route = createFileRoute("/(auth)/_auth/auth/signup")({
  component: SignupPage,
});

function SignupPage() {
  return (
    <React.Fragment>
      <AuthPageHeader />
      <AuthPageWrapper greetingText="Create an account">
        <SignupForm />
      </AuthPageWrapper>
    </React.Fragment>
  );
}
