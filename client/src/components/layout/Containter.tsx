"use client";

import React from "react";

export const Containter: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <main className="container mx-auto bg-background">
      <div className="w-full flex items-center justify-center py-4">
        <div className="w-full max-w-7xl min-h-[calc(100svh-6rem)] flex flex-col ">{children}</div>
      </div>
    </main>
  );
};
