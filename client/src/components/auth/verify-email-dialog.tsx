import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";
import { Button } from "../ui/button";
import { useVerifyEmailDialog } from "@/hooks/use-verify-email-dialog";

export const VerifyEmailDialog: React.FC = () => {
  const dialog = useVerifyEmailDialog();

  return (
    <Dialog open={dialog.open} onOpenChange={dialog.handleOpenChange}>
      <DialogContent className="bg-[var(--primary-maroon)]">
        <DialogHeader>
          <DialogTitle className="font-bold">
            Please verify your email
          </DialogTitle>
          <DialogDescription>
            We've sent a verification link to your email address.
          </DialogDescription>
          <DialogDescription>
            Please check your inbox and click on the link to complete your
            registration. If you don't see the email, check your spam folder.
          </DialogDescription>
        </DialogHeader>
        <Button
          className="bg-amber-300 hover:bg-amber-400"
          onClick={dialog.handleResend}
        >
          Resend verification email
        </Button>
      </DialogContent>
    </Dialog>
  );
};
