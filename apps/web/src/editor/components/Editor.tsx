import * as React from "react";
import { Header } from "./header";
import { Sidebar } from "./sidebar";
import MainCanvas from "./MainCanvas";
import { PropertiesPanel } from "./properties";

export const Editor: React.FC = () => {
  return (
    <main className="w-full h-[calc(100svh-3rem)]">
      {/* Header */}
      <Header />
      <div className="flex flex-1 w-full h-full pt-12">
        <Sidebar />
        <div className="flex flex-1 items-center justify-center">
          <MainCanvas />
        </div>
        <PropertiesPanel />
      </div>
    </main>
  );
};
