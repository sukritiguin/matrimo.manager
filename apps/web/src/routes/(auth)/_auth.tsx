import { TRouterContext } from "@/types/router";
import { Outlet, redirect } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";

function checkNotAuthenticated(context: TRouterContext) {
  if (context.session?.isAuthenticated) {
    throw redirect({ to: "/" });
  }
}

export const Route = createFileRoute("/(auth)/_auth")({
  beforeLoad: ({ context }) => checkNotAuthenticated(context),
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col min-h-[calc(100svh-4rem)] items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Outlet />
      </div>
    </div>
  );
}
