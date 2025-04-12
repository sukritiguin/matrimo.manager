import { SessionProvider } from "@/providers/sessionProvider";

import { AUTH_TOKEN_KEY } from "@/lib/constants";
import { useNavigate } from "@tanstack/react-router";
import { removeDataFromLocalStorage } from "@/lib/localStorage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userSignin, userSignout, userSignup } from "@/services/auth.services";
import { useSearchParams } from "./useSearchParams";

export const useSession = () => {
  const [callback] = useSearchParams(["callback"]);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const signup = useMutation({
    mutationKey: ["user", "signup"],
    mutationFn: userSignup,
    onSuccess: () => {
      navigate({ to: "/", reloadDocument: true });
      queryClient.invalidateQueries({ queryKey: ["user", "me"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const signin = useMutation({
    mutationKey: ["user", "signin"],
    mutationFn: userSignin,
    onSuccess: () => {
      if (callback) {
        navigate({ to: callback, reloadDocument: true });
      } else {
        navigate({ to: "/", reloadDocument: true });
      }
      queryClient.invalidateQueries({ queryKey: ["user", "me"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const signout = useMutation({
    mutationKey: ["user", "logout"],
    mutationFn: userSignout,
    onSuccess: () => {
      if (callback) {
        navigate({ to: callback, reloadDocument: true });
      } else {
        navigate({ to: "/", reloadDocument: true });
      }
      queryClient.setQueryData(["user", "me"], null);

      queryClient.clear();

      removeDataFromLocalStorage(AUTH_TOKEN_KEY);
    },
  });

  return { signup, signin, signout, session: SessionProvider.use() };
};
