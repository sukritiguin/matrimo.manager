"use client";

import { CanvasProvider } from "../components/CanvasProvider";
import { Editor } from "../components/Editor";

export function EditorPage() {
  return (
    <CanvasProvider initialCanvas={null}>
      <Editor />
    </CanvasProvider>
  );
}
