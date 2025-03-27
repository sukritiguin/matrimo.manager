import { VerifyEmailDialog } from "@/components/auth/verify-email-dialog";
import { useVerifyEmailDialog } from "@/hooks/use-verify-email-dialog";
import { userRefreshToken } from "@/services/auth.service";
import { getMe } from "@/services/user.service";
import { TUser } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import * as React from "react";

type Session = {
  user: TUser | null;
  isAuthenticated: boolean;
};

export const SessionContext = React.createContext<Session>({
  user: null,
  isAuthenticated: false,
});

export const SessionProvider = ({ children }: { children: React.ReactNode }) => {
  const [isInitialLoading, setInitialLoading] = React.useState(true);
  const notVerifiedDialog = useVerifyEmailDialog();
  const queryClient = useQueryClient();
  const { data, isSuccess } = useQuery({
    queryKey: ["user", "me"],
    queryFn: getMe,
  });

  const { mutate: refreshToken } = useMutation({
    mutationKey: ["user", "refresh-token"],
    mutationFn: userRefreshToken,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["user", "me"] });
    },
    onError: async (error: unknown) => {
      if (error instanceof AxiosError && error.status === 403) {
        notVerifiedDialog.handleOpenChange(true);
      }
    },
    onSettled: () => {
      setInitialLoading(false);
    },
  });

  React.useEffect(() => {
    refreshToken();
    const interval = setInterval(
      () => {
        if (!isSuccess) return;
        refreshToken();
      },
      15 * 60 * 1000
    );
    return () => clearInterval(interval);
  }, [refreshToken, isSuccess]);

  //   TODO: Create intial loading
  if (isInitialLoading) {
    return <div>Loading...</div>;
  }

  return (
    <SessionContext.Provider
      value={{
        user: isSuccess ? data.user : null,
        isAuthenticated: !!data,
      }}
    >
      {children}
      {notVerifiedDialog.open && <VerifyEmailDialog />}
    </SessionContext.Provider>
  );
};
