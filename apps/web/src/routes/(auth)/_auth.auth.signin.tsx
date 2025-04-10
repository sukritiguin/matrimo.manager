import { createFileRoute } from "@tanstack/react-router";

import React from "react";
import { AuthPageWrapper } from "@/components/auth/AuthPageWrapper";
import { AuthPageHeader } from "@/components/auth/AuthPageHeader";
import { SigninForm } from "@/components/auth/SigninForm";

export const Route = createFileRoute("/(auth)/_auth/auth/signin")({
  component: SigninPage,
});

function SigninPage() {
  return (
    <React.Fragment>
      <AuthPageHeader />
      <AuthPageWrapper greetingText="Welcome back">
        <SigninForm />
      </AuthPageWrapper>
    </React.Fragment>
  );
}
