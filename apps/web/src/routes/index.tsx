import { Container } from "@/components/Container";
import { LandingPage } from "@/components/home/LandingPage";
import { Button } from "@/components/ui/button";
import { useSession } from "@/hooks/useSession";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const {
    session: { isAuthenticated },
  } = useSession();

  if (isAuthenticated) return <EventsPage />;

  return <LandingPage />;
}

function EventsPage() {
  const navigate = useNavigate();

  return (
    <Container>
      {/* My library */}
      <section className="w-full pt-6">
        <div className="flex w-full items-center justify-between">
          <div className="py-2 flex gap-3">
            <div className="flex flex-col">
              <h2 className="font-semibold">My library</h2>
              <p className="text-sm text-gray-600">
                Create, share, and collaborate
              </p>
            </div>
          </div>
          <Button
            variant="link"
            size="sm"
            className="text-sky-600"
            onClick={() => navigate({ to: "/library" })}
          >
            View all
          </Button>
        </div>
        {/* My templates */}
        <div className="-full overflow-x-auto no-scrollbar pt-4">
          <div className="flex gap-4 w-max">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
              <div
                key={item}
                className="min-w-[200px] h-64 bg-white rounded-md p-4 shadow"
              >
                Template {item}
              </div>
            ))}
          </div>
        </div>
      </section>
    </Container>
  );
}
