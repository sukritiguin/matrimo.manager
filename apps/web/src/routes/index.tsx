import { LandingPage } from "@/components/home/LandingPage";
import { useSession } from "@/hooks/useSession";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const {
    session: { isAuthenticated },
  } = useSession();

  if (isAuthenticated)
    return (
      <div className="p-2">
        <h3>Welcome Home!</h3>
      </div>
    );

  return <LandingPage />;
}
