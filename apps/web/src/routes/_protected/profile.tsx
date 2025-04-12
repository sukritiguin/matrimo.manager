import { useSession } from "@/hooks/useSession";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const { session } = useSession();
  const { user } = session;

  return (
    <div className="p-4 flex flex-col items-center w-full">
      <h1 className="text-2xl py-6">Profile</h1>
      <p>Email: {user?.id}</p>
      <p>Name: {user?.name}</p>
      <p>Name: {user?.onBoarding}</p>
    </div>
  );
}
