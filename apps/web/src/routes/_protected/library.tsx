import { Container } from "@/components/Container";
import { LibraryPage } from "@/components/library/LibraryPage";
import { LibraryProvider } from "@/components/library/LibraryProvider";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/library")({
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
