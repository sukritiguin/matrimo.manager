import { Outlet } from "react-router-dom";

export default function AuthPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-[var(--primary-maroon)] to-[var(--primary-gold)] p-4">
      <div className="w-full max-w-md rounded-2xl bg-[var(--primary-off-white)] p-6 shadow-lg">
        <Outlet /> {/* This will load either Login or Register component */}
      </div>
    </div>
  );
}
