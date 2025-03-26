import * as React from "react";
import { Button } from "../ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userLogout } from "@/services/auth.service";
import { useSession } from "@/hooks/use-session";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { User2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

export const UserButton: React.FC<{ isMobile?: boolean }> = ({ isMobile }) => {
  const { isAuthenticated, user } = useSession();
  const navigate = useNavigate();

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
        <Button
          className="bg-[var(--primary-maroon)] text-white px-6 py-2 rounded-lg"
          onClick={() => navigate("/auth/login")}
        >
          Get Started
        </Button>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="hover:cursor-pointer">
        {/* TODO: Add user avatar */}
        <Avatar className="ring">
          <AvatarImage />
          <AvatarFallback>
            <User2 className="size-5" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => navigate("/profile")}>Profile</DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate("/settings")}>Settings</DropdownMenuItem>
        <DropdownMenuItem onClick={() => logout()}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
