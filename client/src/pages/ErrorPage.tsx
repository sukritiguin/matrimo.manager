import { Containter } from "@/components/layout/Containter";

export const ErrorPage: React.FC = () => {
  return (
    <Containter>
      <div className="w-full h-full flex flex-col items-center justify-center gap-4">
        <h1 className="text-destructive font-bold text-4xl">Error 404</h1>
        <p className="">Page not found</p>
      </div>
    </Containter>
  );
};
