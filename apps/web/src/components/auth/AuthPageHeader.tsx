import * as React from "react";
import { Logo } from "../Logo";
import { Link } from "@tanstack/react-router";

export const AuthPageHeader: React.FC = () => {
  return (
    <Link
      to="/auth/signin"
      className="flex items-center gap-2 self-center font-medium"
    >
      <div className="inline-flex flex-col gap-2 items-center">
        <Logo className="w-10" />
        <h1 className="font-bold text-xl">MATRIMO</h1>
      </div>
    </Link>
  );
};
