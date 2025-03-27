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
import { RootLayout } from "./components/layout";
import { EditorPage } from "./features/editor/page";
import { EventsPage } from "./features/events/page";
import { ErrorPage } from "./pages/ErrorPage";
import { EditTemplatePage } from "./features/events/page/EditTemplate";

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
        {isAuthenticated ? (
          <Route index element={<EventsPage />} />
        ) : (
          <Route index element={<HomePage />} />
        )}
        <Route path="/about" element={<AboutPage />} />

        <Route path="/auth/" element={<AuthPage />}>
          <Route path="login" element={<Login />} />
          <Route path="verify" element={<UserVerify />} />
        </Route>

        {/* FIXME: Remove me later */}
        {/* <Route path=":events" element={<EventsPageLayout />}>
          <Route index element={<EventsPage />} />
          <Route path=":event" element={<EventDetailsPage />} />
        </Route> */}
        {/* Error route */}
        <Route path="*" element={<ErrorPage />} />
      </Route>
      {/* Editor */}
      <Route path="/editor" element={<EditorPage />} />
      <Route path="/editor/:editorId" element={<EditTemplatePage />} />
    </Routes>
  );
}

export default App;
