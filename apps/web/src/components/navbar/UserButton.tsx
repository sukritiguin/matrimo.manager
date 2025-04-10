import * as React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useSession } from "@/hooks/useSession";
import { useNavigate } from "@tanstack/react-router";
import { useTheme } from "@/hooks/useTheme";

export const UserButton: React.FC<{ isMobile?: boolean }> = ({ isMobile }) => {
  const navigate = useNavigate();
  const {
    session: { isAuthenticated },
    signout: { mutate: signout },
  } = useSession();

  const { themes, theme, setTheme } = useTheme();

  if (isMobile) {
    return (
      <React.Fragment>
        {!isAuthenticated ? (
          <Button className="bg-[var(--primary-maroon)] text-white px-6 py-2 rounded-lg">
            Get Started
          </Button>
        ) : (
          <Button onClick={() => signout()}>Log Out</Button>
        )}
      </React.Fragment>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="hidden md:block">
        <Button onClick={() => navigate({ to: "/auth/signin" })}>
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
      <DropdownMenuContent sideOffset={8}>
        <DropdownMenuItem onClick={() => navigate({ to: "/profile" })}>
          Profile
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Theme</DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent sideOffset={4}>
              <DropdownMenuRadioGroup
                value={theme}
                onValueChange={(value) => setTheme(value as typeof theme)}
              >
                {themes.map((theme) => (
                  <DropdownMenuRadioItem value={theme} className="capitalize">
                    {theme}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signout()}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
