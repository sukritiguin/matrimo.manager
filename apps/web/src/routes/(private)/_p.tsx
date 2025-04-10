import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(private)/_p")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
