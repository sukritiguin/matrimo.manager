import { Container } from "@/components/Container";
import { LibraryPage } from "@/components/library/LibraryPage";
import { LibraryProvider } from "@/components/library/LibraryProvider";
import { getAllEvents } from "@/services/events.services";
import { QueryClient, queryOptions } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const libraryQueryOptions = queryOptions({
  queryKey: ["library", "events"],
  queryFn: () => getAllEvents(),
  refetchInterval: 15 * 60 * 1000,
  refetchOnWindowFocus: false,
});

const queryClient = new QueryClient();

export const Route = createFileRoute("/_protected/library")({
  loader: () => queryClient.ensureQueryData(libraryQueryOptions),
  errorComponent: () => <p>Something went wrong</p>,
  pendingComponent: () => <p>Loading...</p>,
  component: RouterComponent,
});

function RouterComponent() {
  return (
    <Container>
      <LibraryProvider.Provider>
        <LibraryPage />
      </LibraryProvider.Provider>
    </Container>
  );
}
