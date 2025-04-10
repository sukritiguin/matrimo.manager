import { Outlet } from "@tanstack/react-router";
import { TRouterContext } from "@/types/router";

import { createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import { Navbar } from "@/components/navbar/Navbar";

export const Route = createRootRouteWithContext<TRouterContext>()({
  component: () => (
    <>
      <Navbar />
      <div className="pt-12">
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </>
  ),
});
