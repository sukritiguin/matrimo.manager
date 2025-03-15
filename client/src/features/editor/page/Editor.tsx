"use client";

import {
  Canvas,
  CanvasButtonToolbar,
  CanvasToolbar,
  EditorHeader,
  LeftSidebar,
  RightSidebar,
} from "../components";
import { CanvasProvider } from "../components/CanvasProvider";

function EditorPageWrapper() {
  return (
    <div className="flex flex-col w-full h-screen max-h-screen bg-background">
      <EditorHeader />
      <div className="flex w-full flex-1 overflow-hidden">
        <LeftSidebar />
        <div className="flex-1 w-full flex flex-col justify-between overflow-hidden">
          <CanvasToolbar />
          <Canvas />
        </div>
      </div>
    </div>
  );
}

export function EditorPage() {
  return (
    <CanvasProvider>
      <EditorPageWrapper />
    </CanvasProvider>
  );
}
