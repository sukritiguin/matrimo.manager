import * as React from "react";
import { Header } from "./header";
import { Sidebar } from "./sidebar";
import MainCanvas from "./MainCanvas";
import { PropertiesPanel } from "./properties";
import { UploadPreview } from "./sidebar/UploadPreview";
import { useCanvasUpdate } from "../hooks/useCanvasUpdate";
import { useEditorData } from "../hooks/useEditorData";

export const Editor: React.FC = () => {
  const { data } = useEditorData();

  React.useEffect(() => {
    const keydownHandler = (e: KeyboardEvent) => {};
    window.addEventListener("keydown", keydownHandler);
    return () => {
      window.removeEventListener("keydown", keydownHandler);
    };
  }, []);

  useCanvasUpdate(data.canvas.id);

  return (
    <main className="w-full h-[calc(100svh-3rem)]">
      {/* Header */}
      <Header />
      <div className="flex flex-1 w-full h-full pt-12">
        <UploadPreview />
        <Sidebar />
        <div className="flex flex-1 items-center justify-center">
          <MainCanvas />
        </div>
        <PropertiesPanel />
      </div>
    </main>
  );
};
