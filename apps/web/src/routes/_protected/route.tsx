import { Container } from "@/components/Container";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected")({
  loader: ({ context, location }) => {
    const isAuthenticated = context.session?.isAuthenticated;

    if (!isAuthenticated) {
      throw redirect({
        to: "/auth/signin",
        search: { callback: location.pathname },
      });
    }
  },
  component: ProtectedLayout,
});

function ProtectedLayout() {
  return (
    <Container>
      <Outlet />
    </Container>
  );
}
