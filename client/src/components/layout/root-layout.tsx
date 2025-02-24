import { Outlet } from "react-router-dom";
import Navbar from "../common/navbar";

export const RootLayout = () => {
  return (
    <div className="flex min-h-screen pt-16 justify-center bg-gradient-to-r from-[var(--primary-maroon)] to-[var(--primary-gold)]">
      <div className="w-full">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};
