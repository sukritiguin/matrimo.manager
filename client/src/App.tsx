import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import AuthPage from "./pages/auth/AuthPage";
import Login from "./pages/auth/Login";
import "./index.css";
import HomePage from "./pages/Home";
import AboutPage from "./pages/About";
import { UserVerify } from "./pages/auth/UserVerify";
import React from "react";

import { AuthRoutes } from "./lib/utils";
import { useSession } from "./hooks/use-session";
import { EventDetailsPage, EventsPage, EventsPageLayout } from "./pages/events";
import { RootLayout } from "./components/layout";

function App() {
  const { pathname } = useLocation();
  const { isAuthenticated } = useSession();
  const navigate = useNavigate();

  React.useEffect(() => {
    const isAuthRoute = AuthRoutes.includes(pathname);
    if (isAuthRoute && isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, pathname, navigate]);

  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />

        <Route path="/auth/" element={<AuthPage />}>
          <Route path="login" element={<Login />} />
          <Route path="verify" element={<UserVerify />} />
        </Route>

        {/* Add more routes here */}
        <Route path=":events" element={<EventsPageLayout />}>
          <Route index element={<EventsPage />} />
          <Route path=":event" element={<EventDetailsPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
