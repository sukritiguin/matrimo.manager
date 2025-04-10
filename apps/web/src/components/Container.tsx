import React from "react";

interface _props {
  children: React.ReactNode;
}

export const Container = ({ children }: _props) => {
  return (
    <main className="container mx-auto w-full min-h-[calc(100svh-4rem)]">
      <div className="flex w-full items-center justify-center">
        <div className="flex w-full max-w-7xl">{children}</div>
      </div>
    </main>
  );
};
