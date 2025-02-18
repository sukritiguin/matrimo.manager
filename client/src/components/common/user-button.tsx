import * as React from "react";
import { Button } from "../ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userLogout } from "@/services/auth.service";
import { useSession } from "@/hooks/use-session";

export const UserButton: React.FC<{ isMobile?: boolean }> = ({ isMobile }) => {
  const { isAuthenticated } = useSession();

  const queryClient = useQueryClient();

  const { mutate: logout } = useMutation({
    mutationKey: ["user", "logout"],
    mutationFn: userLogout,
    onSuccess: () => {
      queryClient.resetQueries({ queryKey: ["user", "me"] });
      queryClient.removeQueries({ queryKey: ["user", "me"] });
      queryClient.removeQueries({ queryKey: ["user", "refresh-token"] });
      queryClient.clear();
    },
  });

  if (isMobile) {
    return (
      <React.Fragment>
        {!isAuthenticated ? (
          <Button className="bg-[var(--primary-maroon)] text-white px-6 py-2 rounded-lg">
            Get Started
          </Button>
        ) : (
          <Button
            className="bg-[var(--primary-maroon)] text-white px-6 py-2 rounded-lg"
            onClick={() => logout()}
          >
            Log Out
          </Button>
        )}
      </React.Fragment>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="hidden md:block">
        <Button className="bg-[var(--primary-maroon)] text-white px-6 py-2 rounded-lg">
          Get Started
        </Button>
      </div>
    );
  }

  return (
    <Button className="hidden md:block" onClick={() => logout()}>
      <span className="text-sm font-medium ml-2">Logout</span>
    </Button>
  );
};
