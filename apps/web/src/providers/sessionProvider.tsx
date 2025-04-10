import { useEffect } from "react";

import { TSession } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getMe } from "@/services/users.services";
import { refreshToken } from "@/services/auth.services";
import { createReactContext } from "@/lib/createReactContext";
import { useSessionStore } from "@/store/sessionStore";

interface ISessionProvider extends TSession {
  accessToken: string | null;
  setAccessToken: (accessToken: string) => void;
  clearAccessToken: () => void;
  reset: () => void;
}

export const SessionProvider = createReactContext<ISessionProvider>(() => {
  const {
    isInitailLoading,
    setIsInitailLoading,
    setAccessToken,
    accessToken,
    clearAccessToken,
    reset,
  } = useSessionStore();

  const { mutate: refreshUserToken, isSuccess: isRefreshTokenSuccess } =
    useMutation({
      mutationKey: ["user", "session"],
      mutationFn: refreshToken,
      onSuccess: (data) => {
        setAccessToken(data.accessToken);
      },
    });

  const userData = useQuery({
    queryKey: ["user", "me"],
    queryFn: getMe,
    refetchInterval: 0,
    enabled: isRefreshTokenSuccess,
    staleTime: Infinity,
    retry: false,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitailLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [setIsInitailLoading]);

  useEffect(() => {
    refreshUserToken();

    const timer = setInterval(() => refreshUserToken(), 15 * 60 * 1000);

    return () => clearInterval(timer);
  }, [refreshUserToken]);

  const user = userData.data?.data.user;
  const isAuthenticated = !!user;

  return {
    user,
    isAuthenticated,
    isInitailLoading,
    accessToken,
    setAccessToken,
    clearAccessToken,
    reset,
  };
});
