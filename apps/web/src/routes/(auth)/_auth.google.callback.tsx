import { userGoogleLogin } from "@/services/auth.services";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/(auth)/_auth/google/callback")({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const { mutate, isPending, isSuccess, isError, error } = useMutation({
    mutationKey: ["user", "login", "google"],
    mutationFn: userGoogleLogin,
    onSuccess: () => {
      setTimeout(() => {
        router.navigate({ to: "/" });
      }, 1000);
    },
  });

  useEffect(() => {
    mutate();
  }, [mutate]);

  return (
    <div className="flex justify-center items-center h-screen">
      {isPending && <div>Loading...</div>}
      {isError && <div>{error.message}</div>}
      {isSuccess && <div>Success</div>}
    </div>
  );
}
