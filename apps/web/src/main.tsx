import ReactDOM from "react-dom/client";
import { SessionProvider } from "./providers/sessionProvider";
import { App } from "./app";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./providers/themeProvider";

const queryClient = new QueryClient();

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <SessionProvider.Provider>
          <App />
        </SessionProvider.Provider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
