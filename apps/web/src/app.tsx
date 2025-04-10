import { createRouter, RouterProvider } from "@tanstack/react-router";
import { SessionProvider } from "./providers/sessionProvider";

import { routeTree } from "./routeTree.gen";

const router = createRouter({
  routeTree,
  context: {
    session: undefined,
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}



export function App() {
  const session = SessionProvider.use();

  if (session.isInitailLoading) {
    return <div>Loading...</div>;
  }

  return (
    <RouterProvider
      router={router}
      context={{
        session,
      }}
    />
  );
}
