import { resendEmailVerification } from "@/services/auth.service";
import { create } from "zustand";

type State = {
  open: boolean;
  handleResend: () => Promise<void>;
  handleOpenChange: (isOpen: boolean) => void;
  show: () => void;
  hide: () => void;
};

export const useVerifyEmailDialog = create<State>((set, get) => ({
  open: false,

  handleResend: async () => {
    try {
      const email = localStorage.getItem("email");
      if (!email) {
        throw new Error("No email found in local storage");
      }
      await resendEmailVerification(email);
      localStorage.removeItem("email");
    } catch (error: any) {
      console.error(error.message);
      alert("Failed to resend verification email. Please try again later.");
    } finally {
      set({ open: false });
    }
  },
  handleOpenChange: (isOpen) => {
    set({ open: isOpen });
  },
  show: () => set({ open: true }),
  hide: () => set({ open: false }),
}));
