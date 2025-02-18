import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import AuthPage from "./pages/auth/AuthPage";
import Login from "./pages/auth/Login";
import "./index.css";
import HomePage from "./pages/Home";
import AboutPage from "./pages/About";
import Navbar from "./components/common/navbar";
import { UserVerify } from "./pages/auth/UserVerify";
import React from "react";

import { AuthRoutes } from "./lib/utils";
import { useSession } from "./hooks/use-session";

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
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-[var(--primary-maroon)] to-[var(--primary-gold)]">
      <div className="w-full">
        <Navbar />
        <Routes>
          <Route path="/auth/" element={<AuthPage />}>
            <Route path="login" element={<Login />} />
            <Route path="verify" element={<UserVerify />} />
          </Route>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
